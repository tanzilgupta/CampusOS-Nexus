import {
    useEffect,
    useState,
} from "react";

import {
    FolderKanban,
    Plus,
    Sparkles,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import {
    useAuthContext,
} from "../../context/AuthContext";

import {
    getProjectsByOwner,
} from "../../services/projectService";

import type {
    Project,
} from "../../types/project";

import ProjectCard from "../../components/project/ProjectCard";



const MyProjects = () => {


    const {
        user,
    } = useAuthContext();



    const [
        projects,
        setProjects,
    ] = useState<Project[]>([]);



    const [
        loading,
        setLoading,
    ] = useState(true);



    useEffect(() => {


        const loadProjects = async () => {


            if (!user?.id) {

                setLoading(false);

                return;

            }



            try {


                const data =
                    await getProjectsByOwner(
                        user.id
                    );


                setProjects(data);



            } catch (error) {


                console.error(
                    "Failed loading projects",
                    error
                );


                setProjects([]);



            } finally {


                setLoading(false);


            }


        };


        loadProjects();


    }, [user]);




    return (

        <main className="page-shell">


            <div className="page-container">



                <section className="page-heading">


                    <div>


                        <span className="eyebrow">

                            PROJECT MANAGEMENT

                        </span>



                        <h1>

                            My Projects

                        </h1>



                        <p>

                            Manage your projects, review applications,
                            and build your teams.

                        </p>


                    </div>



                    <Sparkles
                        size={34}
                        className="heading-icon"
                    />


                </section>





                <div className="projects-toolbar">


                    <Link
                        to="/projects/create"
                        className="project-create-button"
                    >

                        <Plus size={18} />

                        Create Project


                    </Link>


                </div>





                {
                    loading && (

                        <div className="projects-empty-state">

                            Loading projects...

                        </div>

                    )
                }





                {
                    !loading &&
                    projects.length === 0 && (


                        <div className="projects-empty-state">


                            <div className="empty-state-icon">

                                <FolderKanban
                                    size={28}
                                />

                            </div>



                            <h2>

                                No projects created yet

                            </h2>



                            <p>

                                Start your first project and find teammates.

                            </p>



                            <Link
                                to="/projects/create"
                                className="dashboard-secondary-button"
                            >

                                Create Project

                            </Link>



                        </div>


                    )
                }






                {
                    !loading &&
                    projects.length > 0 && (


                        <section className="projects-grid">


                            {
                                projects.map(
                                    project => (

                                        <ProjectCard

                                            key={
                                                project.id
                                            }

                                            project={
                                                project
                                            }

                                            isOwner={
                                                true
                                            }

                                        />


                                    )
                                )
                            }



                        </section>


                    )
                }





            </div>


        </main>

    );

};


export default MyProjects;