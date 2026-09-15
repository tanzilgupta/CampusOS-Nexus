import "./Dashboard.css";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    FolderKanban,
    Users,
    Code2,
    Trophy,
    TrendingUp,
    Plus,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { getProjectsByOwner } from "../../services/projectService";
import profileService from "../../services/profileService";
import skillService from "../../services/skillService";
import { getUserReviews } from "../../services/reviewService";
import { getAllTeams } from "../../services/teamService";

import type { Project } from "../../types/project";
import ProjectCard from "../../components/project/ProjectCard";

function Dashboard() {
    const { user } = useAuthContext();

    const [myProjects, setMyProjects] = useState<Project[]>([]);
    const [skillsCount, setSkillsCount] = useState(0);
    const [profileCompletion, setProfileCompletion] = useState(20);
    const [collaborationsCount, setCollaborationsCount] = useState(0);
    const [collaborationScore, setCollaborationScore] = useState("—");
    
    const [tasks, setTasks] = useState({
        hasSkills: false,
        hasInterests: false,
        hasAvailability: false,
    });

    const [greeting] = useState(() => {
        const hrs = new Date().getHours();
        if (hrs < 12) return "Good morning";
        if (hrs < 18) return "Good afternoon";
        return "Good evening";
    });

    useEffect(() => {
        const loadDashboardData = async () => {
            if (!user?.id) return;

            // 1. Load Projects
            try {
                const projects = await getProjectsByOwner(user.id);
                setMyProjects(projects);
            } catch (err) {
                console.error("Error loading projects:", err);
            }

            // 2. Load Skills
            let userSkillsCount = 0;
            try {
                const skills = await skillService.getSkills(user.id);
                userSkillsCount = skills.length;
                setSkillsCount(userSkillsCount);
            } catch (err) {
                console.error("Error loading skills:", err);
            }

            // 3. Load Profile to compute completion
            const hasBioInterestsAvailability = {
                hasSkills: userSkillsCount > 0,
                hasInterests: false,
                hasAvailability: false,
            };

            try {
                const profile = await profileService.getProfile();
                if (profile) {
                    let score = 20; // base for creating account
                    if (profile.fullName) score += 15;
                    if (profile.bio) score += 15;
                    if (profile.university) score += 10;
                    if (profile.degree) score += 10;
                    if (profile.year) score += 10;
                    if (profile.branch) score += 10;
                    if (profile.availability) {
                        score += 10;
                        hasBioInterestsAvailability.hasAvailability = true;
                    }
                    if (profile.interests && profile.interests.length > 0) {
                        hasBioInterestsAvailability.hasInterests = true;
                    }
                    if (userSkillsCount > 0) {
                        score += 10;
                    }
                    
                    // Cap at 100
                    setProfileCompletion(Math.min(score, 100));
                }
            } catch {
                // If profile doesn't exist yet, it's 20% by default
                if (userSkillsCount > 0) {
                    setProfileCompletion(30);
                }
            }

            setTasks(hasBioInterestsAvailability);

            // 4. Load Reviews for collaboration score
            try {
                const reviews = await getUserReviews(user.id);
                if (reviews && reviews.length > 0) {
                    const avg = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
                    // Format score as a percentage or e.g., 4.5/5
                    setCollaborationScore(`${avg.toFixed(1)}/5`);
                } else {
                    setCollaborationScore("New");
                }
            } catch (err) {
                console.error("Error loading reviews:", err);
            }

            // 5. Load Teams for collaborations count
            try {
                const allTeams = await getAllTeams();
                // Filter teams where user is creator or member
                const userTeams = allTeams.filter(team => {
                    return team.createdBy === user.id; // basic fallback logic or if members has user.id
                });
                setCollaborationsCount(userTeams.length);
            } catch (err) {
                console.error("Error loading teams:", err);
            }
        };

        loadDashboardData();
    }, [user]);

    return (
        <div className="dashboard-page">
            <section className="dashboard-header">
                <div>
                    <div className="dashboard-eyebrow-wrapper">
                        <p className="dashboard-eyebrow">YOUR COLLABORATION SPACE</p>
                    </div>
                    <h1>
                        {greeting}, <span>{user?.name || "Student"}</span>
                    </h1>
                    <p className="dashboard-subtitle">
                        Discover ideas, find complementary teammates, and build impactful projects together.
                    </p>
                </div>

                <Link to="/projects/create" className="dashboard-create-button">
                    <Plus size={18} />
                    Create Project
                </Link>
            </section>

            <section className="dashboard-stats">
                <div className="dashboard-stat-card">
                    <div className="stat-icon">
                        <Code2 size={20} />
                    </div>
                    <div>
                        <span>Skills Demonstrated</span>
                        <strong>{skillsCount}</strong>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon">
                        <FolderKanban size={20} />
                    </div>
                    <div>
                        <span>Projects Created</span>
                        <strong>{myProjects.length}</strong>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon">
                        <Users size={20} />
                    </div>
                    <div>
                        <span>Collaborations</span>
                        <strong>{collaborationsCount}</strong>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon">
                        <Trophy size={20} />
                    </div>
                    <div>
                        <span>Collaboration Score</span>
                        <strong>{collaborationScore}</strong>
                    </div>
                </div>
            </section>

            <section className="dashboard-grid">
                <div className="dashboard-card profile-progress-card">
                    <div className="card-heading">
                        <div>
                            <h2>Complete your capability profile</h2>
                            <p>Help CampusOS Nexus recommend the best teammates matching your skill gaps.</p>
                        </div>
                        <Sparkles size={22} style={{ color: "var(--primary)" }} />
                    </div>

                    <div className="progress-wrapper">
                        <div className="progress-info">
                            <span>Profile Completion</span>
                            <strong>{profileCompletion}%</strong>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-value"
                                style={{
                                    width: `${profileCompletion}%`,
                                }}
                            />
                        </div>
                    </div>

                    <div className="profile-tasks">
                        <div className="profile-task-item">
                            <span className="task-check">✓</span>
                            <span>Create account</span>
                        </div>

                        {tasks.hasSkills ? (
                            <div className="profile-task-item">
                                <span className="task-check">✓</span>
                                <span>Add your skills</span>
                            </div>
                        ) : (
                            <Link to="/profile" className="profile-task-link">
                                <span>Add your skills</span>
                                <ArrowRight size={15} />
                            </Link>
                        )}

                        {tasks.hasInterests ? (
                            <div className="profile-task-item">
                                <span className="task-check">✓</span>
                                <span>Add your interests</span>
                            </div>
                        ) : (
                            <Link to="/profile" className="profile-task-link">
                                <span>Add your interests</span>
                                <ArrowRight size={15} />
                            </Link>
                        )}

                        {tasks.hasAvailability ? (
                            <div className="profile-task-item">
                                <span className="task-check">✓</span>
                                <span>Set your availability</span>
                            </div>
                        ) : (
                            <Link to="/profile" className="profile-task-link">
                                <span>Set your availability</span>
                                <ArrowRight size={15} />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="dashboard-card insight-card">
                    <div className="card-heading">
                        <div>
                            <h2>Collaboration Potential</h2>
                            <p>Your standing within the campus building ecosystem.</p>
                        </div>
                        <TrendingUp size={22} style={{ color: "var(--secondary)" }} />
                    </div>

                    <div className="insight-score">
                        <strong>{collaborationScore}</strong>
                        <span>
                            {collaborationScore === "—" || collaborationScore === "New"
                                ? "Complete collaborative projects and receive peer reviews to unlock."
                                : "Excellent collaborative standing."}
                        </span>
                    </div>

                    <Link to="/profile" className="text-link">
                        Build my profile
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <h2>My Projects</h2>
                        <p>Manage projects you created and review applications from students.</p>
                    </div>
                    <Link to="/projects/create" className="text-link">
                        Create new
                        <Plus size={16} />
                    </Link>
                </div>

                {myProjects.length === 0 ? (
                    <div className="empty-dashboard-state">
                        <div className="empty-state-icon">
                            <FolderKanban size={28} />
                        </div>
                        <h3>No projects created yet</h3>
                        <p>Create your first project and start building with campus teammates.</p>
                        <Link to="/projects/create" className="dashboard-secondary-button">
                            Create Project
                        </Link>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {myProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} isOwner={true} />
                        ))}
                    </div>
                )}
            </section>

            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <h2>Recommended for You</h2>
                        <p>Personalized recommended matching projects tailored to your skills.</p>
                    </div>
                    <Link to="/projects" className="text-link">
                        Explore projects
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="empty-dashboard-state">
                    <div className="empty-state-icon">
                        <FolderKanban size={28} />
                    </div>
                    <h3>Your recommendations are waiting</h3>
                    <p>Add your skills and interests to discover matching projects instantly.</p>
                    <Link to="/profile" className="dashboard-secondary-button">
                        Complete Profile
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
