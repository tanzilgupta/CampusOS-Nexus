import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle,
    FolderKanban,
    Pencil,
    Sparkles,
    Trash2,
    Users,
} from "lucide-react";

import Loader from "../../components/common/Loader";

import ApplicationModal from "../../components/project/ApplicationModal";

import {
    getProject,
    deleteProject,
} from "../../services/projectService";

import {
    applyToProject,
    getUserApplications,
    getProjectApplications,
    updateApplicationStatus,
} from "../../services/applicationService";

import {
    useAuthContext,
} from "../../context/AuthContext";

import type {
    Project,
} from "../../types/project";

import type {
    Application,
} from "../../services/applicationService";


const ProjectDetails = () => {

    const {
        projectId,
    } = useParams();


    const navigate =
        useNavigate();


    const {
        user,
    } = useAuthContext();


    const [
        project,
        setProject,
    ] = useState<Project | null>(null);


    const [
        isLoading,
        setIsLoading,
    ] = useState(true);


    const [
        isApplying,
        setIsApplying,
    ] = useState(false);

    const [
        showApplicationModal,
        setShowApplicationModal,
    ] = useState(false);


    const [
        hasApplied,
        setHasApplied,
    ] = useState(false);


    const [
        application,
        setApplication,
    ] = useState<Application | null>(null);


    const [
        projectApplications,
        setProjectApplications,
    ] = useState<Application[]>([]);


    const [
        error,
        setError,
    ] = useState("");



    const isOwner =
        project?.ownerId === user?.id;



    useEffect(() => {

        const loadProjectDetails =
            async () => {

                if (!projectId) {

                    navigate("/projects");

                    return;

                }


                try {

                    const projectData =
                        await getProject(
                            Number(projectId)
                        );


                    setProject(
                        projectData
                    );


                    if (!user) {

                        return;

                    }


                    if (
                        projectData.ownerId === user.id
                    ) {

                        const applications =
                            await getProjectApplications(
                                projectData.id
                            );


                        setProjectApplications(
                            applications
                        );

                    } else {

                        const applications =
                            await getUserApplications(
                                user.id
                            );


                        const existing =
                            applications.find(
                                item =>
                                    item.projectId ===
                                    Number(projectId)
                            );


                        if (existing) {

                            setHasApplied(true);

                            setApplication(
                                existing
                            );

                        }

                    }


                } catch {

                    setProject(null);

                } finally {

                    setIsLoading(false);

                }

            };


        loadProjectDetails();


    }, [
        projectId,
        navigate,
        user,
    ]);



    const handleApply = async (
        message: string
    ) => {

        if (
            !project ||
            !user ||
            hasApplied
        ) {
            return;
        }

        if (!message.trim()) {
            setError("Please write an application message.");
            return;
        }


        setIsApplying(true);

        setError("");


        try {

            const result =
                await applyToProject(
                    project.id,
                    user.id,
                    {
                        message,
                    }
                );


            setApplication(result);

            setHasApplied(true);

            setShowApplicationModal(false);


        } catch (err) {


            const response =
                err as {
                    response?: {
                        data?: {
                            message?: string;
                        };
                    };
                };


            setError(
                response.response?.data?.message ||
                "Failed to submit application."
            );


        } finally {

            setIsApplying(false);

        }

    };



    const handleStatusUpdate =
        async (
            id: number,
            status: "APPROVED" | "REJECTED"
        ) => {


            try {

                await updateApplicationStatus(
                    id,
                    status
                );


                setProjectApplications(
                    previous =>
                        previous.map(
                            app =>
                                app.id === id
                                    ? {
                                        ...app,
                                        status,
                                    }
                                    : app
                        )
                );


            } catch {

                console.error(
                    "Unable to update application"
                );

            }

        };



    const handleDelete =
        async () => {


            if (!project) {

                return;

            }


            const confirmDelete =
                window.confirm(
                    "Delete this project?"
                );


            if (!confirmDelete) {

                return;

            }


            try {

                await deleteProject(
                    project.id
                );


                navigate(
                    "/projects"
                );


            } catch {

                setError(
                    "Unable to delete project."
                );

            }

        };



    if (isLoading) {

        return <Loader />;

    }



    if (!project) {

        return (

            <main className="page-shell">

                <div className="page-container">

                    <div className="projects-empty-state">

                        <div className="empty-state-icon">

                            <FolderKanban size={28} />

                        </div>


                        <h2>
                            Project not found
                        </h2>


                        <p>
                            This project may have been removed.
                        </p>


                        <Link
                            to="/projects"
                            className="dashboard-secondary-button"
                        >
                            Back to Projects
                        </Link>

                    </div>

                </div>

            </main>

        );

    }
    return (

        <main className="page-shell">

            <div className="page-container">


                <Link
                    to="/projects"
                    className="back-button"
                >

                    <ArrowLeft size={17} />

                    Back to Projects

                </Link>



                <div className="details-layout">


                    <section>


                        <div className="details-header">


                            <span className="project-domain">

                                {project.domain}

                            </span>



                            <h1>

                                {project.title}

                            </h1>



                            <p className="project-description">

                                {project.description}

                            </p>


                        </div>




                        {isOwner && (

                            <div className="details-card card">

                                <h2>
                                    Manage Project
                                </h2>


                                <div className="project-meta">


                                    <Link
                                        to={`/projects/${project.id}/edit`}
                                        className="auth-submit"
                                    >

                                        <Pencil size={17} />

                                        Edit Project

                                    </Link>



                                    <button
                                        className="auth-submit"
                                        type="button"
                                        onClick={handleDelete}
                                    >

                                        <Trash2 size={17} />

                                        Delete Project

                                    </button>


                                </div>


                            </div>

                        )}






                        <div className="details-card card">


                            <h2>

                                About this Project

                            </h2>



                            <p className="project-description">

                                {project.description}

                            </p>


                        </div>






                        <div className="details-card card">


                            <div className="project-card-icon">

                                <Sparkles size={22} />

                            </div>



                            <h2>

                                Find the Right Teammates

                            </h2>



                            <p>

                                Discover students whose skills match
                                this project's needs.

                            </p>




                            {isOwner && (
                                <Link
                                    to={`/recommendations/${project.id}`}
                                    className="quick-action-button"
                                >
                                    <Sparkles size={16} />
                                    Find Recommended Teammates
                                </Link>
                            )}


                        </div>



                    </section>







                    <aside>



                        {isOwner ? (


                            <div className="details-card card">


                                <div className="project-card-icon">

                                    <Users size={22} />

                                </div>



                                <h2>

                                    Applicants

                                </h2>



                                <p>

                                    Review students who want to join
                                    your project.

                                </p>




                                {
                                    projectApplications.length === 0 ? (


                                        <p>

                                            No applications yet.

                                        </p>


                                    ) : (


                                        <div className="applicant-list">


                                            {
                                                projectApplications.map(
                                                    app => (

                                                        <div
                                                            key={app.id}
                                                            className="applicant-card"
                                                        >


                                                            <div className="applicant-header">


                                                                <strong>

                                                                    {
                                                                        app.userName ||
                                                                        `User #${app.userId}`
                                                                    }

                                                                </strong>



                                                                <span>

                                                                    {app.status}

                                                                </span>


                                                            </div>




                                                            {
                                                                app.message && (

                                                                    <p>

                                                                        {app.message}

                                                                    </p>

                                                                )
                                                            }





                                                            <Link
                                                                to={`/students/${app.userId}`}
                                                            >

                                                                View Profile

                                                            </Link>





                                                            {
                                                                app.status === "PENDING" && (

                                                                    <div className="project-meta">


                                                                        <button
                                                                            className="auth-submit"
                                                                            onClick={() =>
                                                                                handleStatusUpdate(
                                                                                    app.id,
                                                                                    "APPROVED"
                                                                                )
                                                                            }
                                                                        >

                                                                            Accept

                                                                        </button>




                                                                        <button
                                                                            className="auth-submit"
                                                                            onClick={() =>
                                                                                handleStatusUpdate(
                                                                                    app.id,
                                                                                    "REJECTED"
                                                                                )
                                                                            }
                                                                        >

                                                                            Reject

                                                                        </button>


                                                                    </div>

                                                                )
                                                            }


                                                        </div>

                                                    )
                                                )
                                            }


                                        </div>


                                    )
                                }


                            </div>



                        ) : (



                            <div className="details-card card apply-card">



                                <div className="project-card-icon">

                                    <FolderKanban size={22} />

                                </div>




                                <h2>

                                    Interested in this project?

                                </h2>



                                <p>

                                    Connect with the project owner and
                                    explore how you can contribute.

                                </p>





                                <div className="project-meta">


                                    <div>

                                        <Users size={17} />

                                        Up to {project.maxMembers} members

                                    </div>




                                    {
                                        project.deadline && (

                                            <div>

                                                <CalendarDays size={17} />

                                                Deadline: {project.deadline}

                                            </div>

                                        )
                                    }


                                </div>






                                {
                                    hasApplied ? (


                                        <>

                                            <button
                                                className="auth-submit"
                                                disabled
                                            >

                                                <CheckCircle size={18} />

                                                Application Submitted

                                            </button>




                                            <p className="success-message">

                                                Your application is{" "}
                                                {
                                                    application?.status?.toLowerCase()
                                                    || "pending"
                                                }

                                            </p>


                                        </>



                                    ) : (



                                        <button
                                            className="auth-submit"
                                            onClick={() => setShowApplicationModal(true)}
                                            disabled={isApplying}
                                        >
                                            Apply to Join
                                        </button>


                                    )
                                }





                                {
                                    error && (

                                        <p className="form-error">

                                            {error}

                                        </p>

                                    )
                                }



                            </div>


                        )}



                    </aside>



                </div>

                <ApplicationModal
                    isOpen={showApplicationModal}
                    onClose={() => setShowApplicationModal(false)}
                    onSubmit={handleApply}
                    isSubmitting={isApplying}
                />

            </div>


        </main>

    );

};



export default ProjectDetails;