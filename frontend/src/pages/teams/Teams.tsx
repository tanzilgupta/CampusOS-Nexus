import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Users, Trash2 } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { getAllTeams, deleteTeam } from "../../services/teamService";
import type { Team } from "../../types/team";

const Teams = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTeams = async () => {
        try {
            const data = await getAllTeams();
            setTeams(data);
        } catch {
            setError("Unable to load teams.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTeams();
    }, []);

    const handleDelete = async (teamId: number) => {
        if (!window.confirm("Are you sure you want to delete this team?")) {
            return;
        }
        try {
            await deleteTeam(teamId);
            setTeams(previous => previous.filter(team => team.id !== teamId));
        } catch {
            setError("Unable to delete team.");
        }
    };

    if (isLoading) {
        return (
            <div className="profile-loading">
                Loading teams...
            </div>
        );
    }

    return (
        <div className="page-shell animate-scale-in">
            <div className="page-container">
                <div className="page-heading">
                    <div>
                        <p className="eyebrow">COLLABORATION</p>
                        <h1>Your Teams</h1>
                        <p>Create and manage teams for collaborative projects.</p>
                    </div>
                    <button
                        className="profile-action-button"
                        onClick={() => navigate("/teams/create")}
                    >
                        <Plus size={18} />
                        Create Team
                    </button>
                </div>

                {error && <div className="form-error">{error}</div>}

                {teams.length === 0 ? (
                    <div className="empty-dashboard-state">
                        <Users size={42} className="empty-state-icon" />
                        <h2>No teams yet</h2>
                        <p>Create your first team and start collaborating.</p>
                        <button
                            className="profile-action-button"
                            onClick={() => navigate("/teams/create")}
                        >
                            Create Team
                        </button>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {teams.map(team => (
                            <div
                                className="project-card"
                                key={team.id}
                                onClick={() => navigate(`/teams/${team.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="project-card-header">
                                    <div className="project-card-icon">
                                        <Users size={20} />
                                    </div>
                                    {user && team.createdBy === user.id && (
                                        <button
                                            className="skill-delete-button"
                                            onClick={event => {
                                                event.stopPropagation();
                                                handleDelete(team.id);
                                            }}
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    )}
                                </div>

                                <h2>{team.name}</h2>
                                <p className="project-card-description">
                                    {team.description || "No description provided."}
                                </p>
                                <span className="project-domain">{team.domain}</span>

                                <div className="project-card-footer">
                                    <span className="project-card-meta">
                                        Project: {team.projectName || `#${team.projectId}`}
                                    </span>
                                    <span className="project-card-meta">
                                        Created by: {team.createdByName || `#${team.createdBy}`}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Teams;