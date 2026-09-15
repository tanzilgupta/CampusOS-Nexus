import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Users, FolderKanban } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { createTeam } from "../../services/teamService";
import { getProjectsByOwner } from "../../services/projectService";
import type { TeamRequest } from "../../types/team";
import type { Project } from "../../types/project";

const DOMAINS = [
    "Frontend Development",
    "Backend Development",
    "Full-Stack Web Dev",
    "Mobile App Development",
    "Data Science & AI/ML",
    "UI/UX Design",
    "Cybersecurity",
    "Cloud Computing",
    "Other",
];

const CreateTeam = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

    const [formData, setFormData] = useState<TeamRequest>({
        name: "",
        description: "",
        domain: "",
        projectId: 0,
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserProjects = async () => {
            if (!user?.id) return;
            try {
                const data = await getProjectsByOwner(user.id);
                setProjects(data);
                if (data.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        projectId: data[0].id,
                        domain: DOMAINS[0]
                    }));
                }
            } catch (err) {
                console.error("Failed to load user projects", err);
            } finally {
                setIsLoadingProjects(false);
            }
        };

        fetchUserProjects();
    }, [user]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;
        setFormData(previous => ({
            ...previous,
            [name]: name === "projectId" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!user) {
            setError("You must be logged in.");
            return;
        }

        if (!formData.name.trim() || !formData.domain.trim() || !formData.projectId) {
            setError("Please fill all required fields.");
            return;
        }

        setIsSaving(true);
        setError("");

        try {
            await createTeam(formData);
            navigate("/teams");
        } catch {
            setError("Unable to create team.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="page-shell animate-scale-in">
            <div className="narrow-container">
                <button className="back-button" onClick={() => navigate("/teams")}>
                    <ArrowLeft size={17} />
                    Back to Teams
                </button>

                <div className="page-heading">
                    <div>
                        <p className="eyebrow">COLLABORATION</p>
                        <h1>Create a Team</h1>
                        <p>Bring students together and start building something meaningful.</p>
                    </div>
                    <div className="heading-icon">
                        <Users size={34} />
                    </div>
                </div>

                <div className="form-card profile-card">
                    {error && <div className="form-error">{error}</div>}

                    {isLoadingProjects ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            Loading projects list...
                        </div>
                    ) : projects.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <FolderKanban size={32} style={{ color: "var(--muted)", marginBottom: "12px" }} />
                            <h3>No Projects Found</h3>
                            <p style={{ margin: "8px 0 16px", fontSize: "0.9rem" }}>
                                You must create a project proposal first before forming a team.
                            </p>
                            <Link to="/projects/create" className="profile-action-button" style={{ display: "inline-flex" }}>
                                Create a Project
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Team Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Team Nexus"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: "16px" }}>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    placeholder="What is your team working on?"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                                <div className="form-group">
                                    <label>Domain</label>
                                    <select
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleChange}
                                        required
                                    >
                                        {DOMAINS.map(d => (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Associated Project</label>
                                    <select
                                        name="projectId"
                                        value={formData.projectId}
                                        onChange={handleChange}
                                        required
                                    >
                                        {projects.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions" style={{ marginTop: "24px" }}>
                                <button
                                    type="button"
                                    className="profile-cancel-button"
                                    onClick={() => navigate("/teams")}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="profile-action-button"
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Creating..." : "Create Team"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateTeam;