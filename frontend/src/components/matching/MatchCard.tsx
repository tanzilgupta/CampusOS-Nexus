import {
    Link,
} from "react-router-dom";

import {
    CheckCircle2,
    Code2,
    Sparkles,
    UserRound,
} from "lucide-react";

import MatchScore from "./MatchScore";

import type {
    RecommendationResponse,
} from "../../types/matching";


interface MatchCardProps {

    recommendation: RecommendationResponse;

}


const MatchCard = ({
    recommendation,
}: MatchCardProps) => {

    return (

        <div
            className="recommendation-card"
        >

            <div
                className="recommendation-card-header"
            >

                <div
                    className="recommendation-avatar"
                >

                    {recommendation.userName
                        ?.charAt(0)
                        .toUpperCase()}

                </div>


                <div>

                    <h2>

                        {recommendation.userName}

                    </h2>


                    <p>

                        Potential teammate

                    </p>

                </div>

            </div>


            <MatchScore
                percentage={
                    recommendation.matchPercentage
                }
            />


            <div
                className="match-progress"
            >

                <div
                    className="match-progress-value"
                    style={{
                        width:
                            `${recommendation.matchPercentage}%`,
                    }}
                />

            </div>


            <div
                className="matching-skills"
            >

                <div
                    className="matching-skills-heading"
                >

                    <Code2
                        size={16}
                    />


                    <span>

                        Matching Skills

                    </span>

                </div>


                <div
                    className="skill-tags"
                >

                    {recommendation.matchingSkills.map(
                        (
                            skill
                        ) => (

                            <span
                                key={
                                    skill
                                }
                                className="skill-tag"
                            >

                                <CheckCircle2
                                    size={13}
                                />

                                {skill}

                            </span>

                        )
                    )}

                </div>

            </div>


            <p
                className="match-reason"
            >

                <Sparkles
                    size={15}
                />


                {recommendation.matchReason}

            </p>


            <Link
                to={`/profile/${recommendation.userId}`}
                className="view-profile-button"
            >

                <UserRound
                    size={16}
                />

                View Profile

            </Link>

        </div>

    );

};


export default MatchCard;