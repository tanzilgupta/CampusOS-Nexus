import {
    CalendarDays,
    Users,
    ArrowRight,
    FolderKanban,
    Pencil,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import type {
    Project,
} from "../../types/project";


interface ProjectCardProps {

    project: Project;

    isOwner?: boolean;

}



const ProjectCard = ({
    project,
    isOwner = false,
}: ProjectCardProps) => {


    return (

        <article className="project-card">


            <div className="project-card-top">


                <div className="project-card-icon">

                    <FolderKanban size={20} />

                </div>



                <span className="project-domain">

                    {project.domain}

                </span>


            </div>





            {isOwner && (

                <span className="project-owner-badge">

                    Your Project

                </span>

            )}






            <h2>

                {project.title}

            </h2>





            <p className="project-card-description">

                {project.description}

            </p>






            {
                project.requiredSkills &&
                project.requiredSkills.length > 0 && (

                    <div className="project-skills">

                        {
                            project.requiredSkills
                                .slice(0, 3)
                                .map(skill => (

                                    <span
                                        key={skill}
                                        className="skill-pill"
                                    >

                                        {skill}

                                    </span>

                                ))
                        }


                        {
                            project.requiredSkills.length > 3 && (

                                <span className="skill-pill">

                                    +{project.requiredSkills.length - 3}

                                </span>

                            )
                        }

                    </div>

                )
            }







            <div className="project-card-meta">


                <span>

                    <Users size={15} />

                    Up to {project.maxMembers} members

                </span>





                {project.deadline && (

                    <span>

                        <CalendarDays size={15} />

                        {project.deadline}

                    </span>

                )}


            </div>







            <div className="project-card-actions">



                <Link

                    to={`/projects/${project.id}`}

                    className="project-card-link"

                >

                    View

                    <ArrowRight size={16} />


                </Link>







                {isOwner && (


                    <Link

                        to={`/projects/${project.id}/edit`}

                        className="project-card-link secondary"

                    >

                        <Pencil size={15} />

                        Edit


                    </Link>


                )}



            </div>





        </article>


    );

};



export default ProjectCard;