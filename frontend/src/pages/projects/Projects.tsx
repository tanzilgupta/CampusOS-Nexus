import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    Plus,
    Search,
    FolderKanban,
    Sparkles,
} from "lucide-react";

import ProjectCard from "../../components/project/ProjectCard";

import Loader from "../../components/common/Loader";

import {
    getProjects,
} from "../../services/projectService";

import type {
    Project,
} from "../../types/project";


const Projects = () => {

    const [projects, setProjects] =
        useState<Project[]>([]);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedDomain, setSelectedDomain] =
        useState("All");

    const [selectedStatus, setSelectedStatus] =
        useState("OPEN");

    const [isLoading, setIsLoading] =
        useState(true);



    useEffect(() => {

        const loadProjects = async () => {

            try {

                const data =
                    await getProjects();

                setProjects(data);

            } catch {

                setProjects([]);

            } finally {

                setIsLoading(false);

            }

        };


        loadProjects();


    }, []);



    const domains = [
        "All",
        ...new Set(
            projects
                .map(project => project.domain)
                .filter(Boolean)
        ),
    ];



    const statuses = [
        "OPEN",
        "IN_PROGRESS",
        "CLOSED",
    ];



    const filteredProjects =
        projects.filter(project => {


            const matchesSearch =
                project.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    ) ||

                project.description
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );



            const matchesDomain =
                selectedDomain === "All" ||
                project.domain === selectedDomain;



            const matchesStatus =
                project.status === selectedStatus;



            return (
                matchesSearch &&
                matchesDomain &&
                matchesStatus
            );


        });



    if (isLoading) {

        return <Loader />;

    }



    return (

        <main className="page-shell">

            <div className="page-container">



                <section className="page-heading">

                    <div>

                        <span className="eyebrow">

                            PROJECT DISCOVERY

                        </span>



                        <h1>

                            Find something worth building.

                        </h1>



                        <p>

                            Explore student-led projects and discover
                            opportunities to contribute, learn, and build
                            with the right people.

                        </p>


                    </div>



                    <Sparkles
                        size={34}
                        className="heading-icon"
                    />


                </section>





                <div className="status-tabs">


                    {statuses.map(status => (

                        <button

                            key={status}

                            className={
                                selectedStatus === status
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                setSelectedStatus(status)
                            }

                        >

                            {status.replace("_", " ")}

                        </button>


                    ))}


                </div>






                <div className="projects-toolbar">



                    <div className="search-wrapper">


                        <Search
                            size={18}
                        />


                        <input

                            type="text"

                            placeholder="Search projects..."

                            value={searchTerm}

                            onChange={event =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }

                        />


                    </div>





                    <select

                        value={selectedDomain}

                        onChange={event =>
                            setSelectedDomain(
                                event.target.value
                            )
                        }

                    >


                        {domains.map(domain => (


                            <option

                                key={domain}

                                value={domain}

                            >

                                {domain}

                            </option>


                        ))}


                    </select>





                    <Link

                        to="/projects/create"

                        className="project-create-button"

                    >

                        <Plus
                            size={18}
                        />

                        Create Project


                    </Link>



                </div>







                {filteredProjects.length === 0 ? (


                    <div className="projects-empty-state">


                        <div className="empty-state-icon">


                            <FolderKanban

                                size={28}

                            />


                        </div>




                        <h2>

                            No projects found

                        </h2>




                        <p>


                            {projects.length === 0

                                ? "Be the first student to turn an idea into a project."

                                : "Try adjusting your search, status, or domain filter."

                            }


                        </p>




                        {projects.length === 0 && (


                            <Link

                                to="/projects/create"

                                className="dashboard-secondary-button"

                            >

                                Create the first project


                            </Link>


                        )}



                    </div>



                ) : (


                    <section className="projects-grid">


                        {filteredProjects.map(project => (


                            <ProjectCard

                                key={project.id}

                                project={project}

                            />


                        ))}


                    </section>


                )}



            </div>


        </main>


    );


};


export default Projects;