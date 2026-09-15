import {
    ArrowLeft,
    Compass,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";


const NotFound = () => {

    return (

        <div className="page-shell not-found-page">

            <div className="page-container">

                <div className="not-found-card">

                    <div className="not-found-icon">

                        <Compass
                            size={42}
                        />

                    </div>


                    <p className="eyebrow">
                        404 ERROR
                    </p>


                    <h1>
                        Lost in the Nexus?
                    </h1>


                    <p className="not-found-description">

                        The page you are looking for does not exist
                        or may have been moved somewhere else.

                    </p>


                    <Link
                        to="/"
                        className="profile-action-button"
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back to Home

                    </Link>

                </div>

            </div>

        </div>

    );

};


export default NotFound;