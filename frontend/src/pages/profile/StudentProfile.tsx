import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    GraduationCap,
    MapPin,
    Code2,
    BriefcaseBusiness,
    ExternalLink,
    ArrowLeft
} from "lucide-react";

import { useAuthContext } from "../../context/AuthContext";
import profileService from "../../services/profileService";
import skillService from "../../services/skillService";
import { getProjectsByOwner } from "../../services/projectService";
import { getUserReviews, type ReviewResponse } from "../../services/reviewService";

import ReviewList from "../../components/profile/ReviewList";
import CreateReview from "../../components/profile/CreateReview";

import type { Profile as ProfileType } from "../../types/profile";
import type { Skill } from "../../types/skill";
import type { Project } from "../../types/project";

const StudentProfile = () => {
    const { user } = useAuthContext();
    const { userId } = useParams();

    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [reviews, setReviews] = useState<ReviewResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchReviews = async () => {
        if (!userId) return;
        try {
            const data = await getUserReviews(Number(userId));
            setReviews(data);
        } catch (err) {
            console.error("Failed to fetch reviews", err);
        }
    };

    useEffect(() => {
        if (!userId) return;

        const loadStudentData = async () => {
            try {
                setLoading(true);
                setError("");
                
                const profileData = await profileService.getPublicProfile(Number(userId));
                setProfile(profileData);
                
                const skillsData = await skillService.getSkills(Number(userId));
                setSkills(skillsData);

                const projectsData = await getProjectsByOwner(Number(userId));
                setProjects(projectsData);

                await fetchReviews();
            } catch {
                setError("Unable to load student profile.");
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        loadStudentData();
    }, [userId]);

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-loading">Loading student profile...</div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="profile-page">
                <div className="profile-container">
                    <Link to="/dashboard" className="back-button" style={{ marginBottom: '20px', display: 'inline-flex' }}>
                        <ArrowLeft size={17} />
                        Back
                    </Link>
                    <div className="profile-error">{error || "Profile not found"}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <Link to=".." relative="path" className="back-button" style={{ marginBottom: '20px', display: 'inline-flex' }}>
                    <ArrowLeft size={17} />
                    Back
                </Link>

                <div className="profile-page-header">
                    <div>
                        <p className="profile-eyebrow">STUDENT IDENTITY</p>
                        <h1>{profile.fullName || "Student Profile"}</h1>
                        <p className="profile-subtitle">Public Profile</p>
                    </div>
                </div>

                <div className="profile-grid">
                    <section className="profile-card profile-overview-card">
                        <div className="profile-avatar-large">
                            {(profile.fullName || "S").charAt(0).toUpperCase()}
                        </div>

                        <h2>{profile.fullName || "Student"}</h2>

                        {profile.bio && (
                            <p className="profile-bio">{profile.bio}</p>
                        )}

                        <div className="profile-quick-info">
                            {profile.university && (
                                <span>
                                    <GraduationCap size={16} />
                                    {profile.university}
                                </span>
                            )}
                            {profile.branch && (
                                <span>
                                    <MapPin size={16} />
                                    {profile.branch}
                                </span>
                            )}
                        </div>

                        <div className="profile-links">
                            {profile.githubUrl && (
                                <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                                    <Code2 size={17} /> GitHub <ExternalLink size={13} />
                                </a>
                            )}
                            {profile.linkedinUrl && (
                                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                                    <BriefcaseBusiness size={17} /> LinkedIn <ExternalLink size={13} />
                                </a>
                            )}
                            {profile.portfolioUrl && (
                                <a href={profile.portfolioUrl} target="_blank" rel="noreferrer">
                                    <ExternalLink size={17} /> Portfolio
                                </a>
                            )}
                        </div>
                    </section>

                    <section className="profile-card">
                        <div className="profile-section-heading">
                            <div>
                                <p className="profile-eyebrow">BACKGROUND</p>
                                <h2>Academic & Interest Details</h2>
                            </div>
                        </div>

                        <div className="profile-details-grid">
                            <DetailItem label="University" value={profile.university} />
                            <DetailItem label="Degree" value={profile.degree} />
                            <DetailItem label="Year" value={profile.year} />
                            <DetailItem label="Branch" value={profile.branch} />
                            <DetailItem label="Availability" value={profile.availability} />
                            <DetailItem label="Interests" value={profile.interests?.join(", ")} />
                        </div>
                    </section>
                </div>

                <section className="profile-card profile-skills-card">
                    <div className="profile-section-heading">
                        <div>
                            <p className="profile-eyebrow">CAPABILITY</p>
                            <h2>Skills & Evidence</h2>
                        </div>
                    </div>

                    {skills.length === 0 ? (
                        <div className="skills-empty-state" style={{ padding: "40px 0" }}>
                            <Code2 size={28} />
                            <p>No skills have been added yet.</p>
                        </div>
                    ) : (
                        <div className="skills-list">
                            {skills.map(skill => (
                                <div className="skill-item" key={skill.id}>
                                    <div className="skill-item-main">
                                        <div className="skill-icon">
                                            <Code2 size={18} />
                                        </div>
                                        <div>
                                            <h3>{skill.name}</h3>
                                            <p>{skill.category} • {skill.proficiency}</p>
                                            {skill.evidence && (
                                                <small>Evidence: {skill.evidence}</small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="profile-card profile-skills-card">
                    <div className="profile-section-heading">
                        <div>
                            <p className="profile-eyebrow">PORTFOLIO</p>
                            <h2>Projects</h2>
                        </div>
                    </div>
                    {projects.length === 0 ? (
                        <div className="skills-empty-state" style={{ padding: "40px 0" }}>
                            <Code2 size={28} />
                            <p>No projects have been added yet.</p>
                        </div>
                    ) : (
                        <div className="skills-list">
                            {projects.map(project => (
                                <div className="skill-item" key={project.id}>
                                    <div className="skill-item-main">
                                        <div>
                                            <Link to={`/projects/${project.id}`}>
                                                <h3>{project.title}</h3>
                                            </Link>
                                            <p>{project.domain} • {project.status}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="profile-card profile-reviews-card">
                    <div className="profile-section-heading">
                        <div>
                            <p className="profile-eyebrow">REPUTATION</p>
                            <h2>Peer Reviews</h2>
                        </div>
                    </div>
                    
                    <ReviewList reviews={reviews} />
                    
                    {user && user.id !== Number(userId) && (
                        <CreateReview 
                            reviewerId={user.id} 
                            reviewedUserId={Number(userId)} 
                            onReviewAdded={fetchReviews} 
                        />
                    )}
                </section>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
    <div className="profile-detail-item">
        <span>{label}</span>
        <strong>{value || "Not specified"}</strong>
    </div>
);

export default StudentProfile;
