interface MatchScoreProps {

    percentage: number;

}


const MatchScore = ({
    percentage,
}: MatchScoreProps) => {

    return (

        <div
            className="match-score"
        >

            <div
                className="match-score-icon"
            >

                <span>

                    %

                </span>

            </div>


            <div>

                <strong>

                    {percentage}%

                </strong>


                <span>

                    Skill Match

                </span>

            </div>

        </div>

    );

};


export default MatchScore;