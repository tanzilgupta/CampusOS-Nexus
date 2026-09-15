import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Award, CheckCircle2, Code2, Sparkles, UserRound, Users } from "lucide-react";
import { getRecommendations } from "../../services/matchingService";
import type { RecommendationResponse } from "../../types/matching";

const Recommendations = () => {
    const { projectId } = useParams();
    const [recommendations, setRecommendations] = useState<RecommendationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRecommendations = async (): Promise<void> => {
            if (!projectId) {
                setError("Project not found.");
                setIsLoading(false);
                return;
            }

            try {
                const data = await getRecommendations(Number(projectId));
                setRecommendations(data);
            } catch {
                setError("Unable to load recommendations.");
            } finally {
                setIsLoading(false);
            }
        };

        loadRecommendations();
    }, [projectId]);

    if (isLoading) {
        return <div className="profile-loading">Finding the best teammates...</div>;
    }

    return (
        <main className="page-shell">
            <div className="page-container">
                <Link to={`/projects/${projectId}`} className="back-button">
                    <ArrowLeft size={17} />
                    Back to Project
                </Link>

                <div className="page-heading">
                    <div>
                        <p className="eyebrow">SMART MATCHING</p>
                        <h1>Recommended Teammates</h1>
                        <p>Discover students whose skills could make them a great fit for your project.</p>
                    </div>
                    <Sparkles size={42} className="heading-icon" />
                </div>

                {error && <div className="form-error">{error}</div>}

                {!error && recommendations.length === 0 && (
                    <div className="empty-dashboard-state">
                        <Users size={42} className="empty-state-icon" />
                        <h2>No recommendations yet</h2>
                        <p>Add skills to student profiles to discover potential teammates.</p>
                    </div>
                )}

                {!error && recommendations.length > 0 && (
                    <div className="recommendations-grid">
                        {recommendations.map((recommendation) => (
                            <div className="recommendation-card" key={recommendation.userId}>
                                <div className="recommendation-card-header">
                                    <div className="recommendation-avatar">
                                        {recommendation.userName?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2>{recommendation.userName}</h2>
                                        <p>Potential teammate</p>
                                    </div>
                                </div>

                                <div className="match-score">
                                    <div className="match-score-icon">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <strong>{recommendation.matchPercentage}%</strong>
                                        <span>Overall fit</span>
                                    </div>
                                </div>

                                <div className="match-progress">
                                    <div
                                        className="match-progress-value"
                                        style={{ width: `${recommendation.matchPercentage}%` }}
                                    />
                                </div>

                                <div className="matching-skills">
                                    <div className="matching-skills-heading">
                                        <Code2 size={16} />
                                        <span>Matching Skills</span>
                                    </div>
                                    <div className="skill-tags">
                                        {recommendation.matchingSkills.map((skill) => (
                                            <span key={skill} className="skill-tag">
                                                <CheckCircle2 size={13} />
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="match-reason">
                                    <Sparkles size={15} />
                                    {recommendation.matchReason}
                                </p>

                                <div className="matching-skills">
                                    <div className="matching-skills-heading">
                                        <Sparkles size={16}/>
                                        <span>Why this match</span>
                                    </div>
                                    <div className="skill-tags">
                                        {recommendation.reasons.map(reason => (
                                            <span key={reason} className="skill-tag">{reason}</span>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    to={`/students/${recommendation.userId}`}
                                    className="view-profile-button"
                                >
                                    <UserRound size={16} />
                                    View Profile
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Recommendations;
