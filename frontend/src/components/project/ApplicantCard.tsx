import {
    Check,
    X,
    UserRound,
} from "lucide-react";

import type {
    Application,
} from "../../services/applicationService";


interface ApplicantCardProps {

    application:
        Application;

    onAccept: (
        applicationId:
            number
    ) => void;

    onReject: (
        applicationId:
            number
    ) => void;

}


const ApplicantCard = ({
    application,
    onAccept,
    onReject,
}: ApplicantCardProps) => {

    const status =
        application.status ||
        "PENDING";


    return (

        <div
            className="applicant-card"
        >

            <div
                className="applicant-card-header"
            >

                <div
                    className="applicant-avatar"
                >

                    <UserRound
                        size={22}
                    />

                </div>


                <div>

                    <h3>

                        User #
                        {application.userId}

                    </h3>


                    <p>

                        Applied to join this project

                    </p>

                </div>

            </div>


            {application.message && (

                <p
                    className="applicant-message"
                >

                    {application.message}

                </p>

            )}


            <div
                className="applicant-card-footer"
            >

                {status === "PENDING" ? (

                    <>

                        <button
                            type="button"
                            className="applicant-accept-button"
                            onClick={() =>
                                onAccept(
                                    application.id
                                )
                            }
                        >

                            <Check
                                size={16}
                            />

                            Accept

                        </button>


                        <button
                            type="button"
                            className="applicant-reject-button"
                            onClick={() =>
                                onReject(
                                    application.id
                                )
                            }
                        >

                            <X
                                size={16}
                            />

                            Reject

                        </button>

                    </>

                ) : (

                    <span
                        className={
                            `application-status ${status.toLowerCase()}`
                        }
                    >

                        {status}

                    </span>

                )}

            </div>

        </div>

    );

};


export default ApplicantCard;