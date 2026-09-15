import {
    Link,
} from "react-router-dom";

import {
    UserRound,
} from "lucide-react";

import type {
    Profile,
} from "../../types/profile";


interface ProfileCardProps {

    profile:
        Profile;

}


const ProfileCard = ({
    profile,
}: ProfileCardProps) => {

    return (

        <div
            className="profile-card"
        >

            <div
                className="profile-card-header"
            >

                <div
                    className="profile-avatar"
                >

                    {profile.fullName
                        ?.charAt(0)
                        .toUpperCase()}

                </div>


                <div>

                    <h2>

                        {profile.fullName}

                    </h2>


                    {profile.bio && (

                        <p>

                            {profile.bio}

                        </p>

                    )}

                </div>

            </div>


            <div
                className="profile-details"
            >

                {profile.university && (

                    <p>

                        <strong>
                            University:
                        </strong>

                        {" "}

                        {profile.university}

                    </p>

                )}


                {profile.degree && (

                    <p>

                        <strong>
                            Degree:
                        </strong>

                        {" "}

                        {profile.degree}

                    </p>

                )}


                {profile.branch && (

                    <p>

                        <strong>
                            Branch:
                        </strong>

                        {" "}

                        {profile.branch}

                    </p>

                )}


                {profile.year && (

                    <p>

                        <strong>
                            Year:
                        </strong>

                        {" "}

                        {profile.year}

                    </p>

                )}

            </div>


            <Link
                to="/profile"
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


export default ProfileCard;