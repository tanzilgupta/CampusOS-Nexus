import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { createProject } from "../../services/projectService";


const ProjectForm = () => {

    const navigate = useNavigate();


    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [domain, setDomain] = useState("");

    const [maxMembers, setMaxMembers] = useState("");

    const [deadline, setDeadline] = useState("");

    const [durationWeeks, setDurationWeeks] = useState("4");


    const [isSubmitting, setIsSubmitting] =
        useState(false);


    const [error, setError] =
        useState("");




    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> => {


        event.preventDefault();



        if (
            !title.trim() ||
            !description.trim() ||
            !domain.trim() ||
            !maxMembers
        ) {

            setError(
                "Please fill in all required fields."
            );

            return;

        }



        setIsSubmitting(true);

        setError("");



        try {


            const project =
                await createProject({

                    title: title.trim(),

                    description: description.trim(),

                    domain: domain.trim(),

                    maxMembers:
                        Number(maxMembers),


                    deadline,


                    durationWeeks:
                        Number(durationWeeks),


                    status:
                        "OPEN" as
                        "OPEN" |
                        "IN_PROGRESS" |
                        "CLOSED",


                    requiredSkillIds: [],

                });



            navigate(
                `/projects/${project.id}`
            );



        } catch {


            setError(
                "Failed to create project. Please try again."
            );



        } finally {


            setIsSubmitting(false);


        }

    };




    return (

        <form
            className="project-form"
            onSubmit={handleSubmit}
        >


            <div className="form-group">

                <label htmlFor="title">
                    Project Title
                </label>


                <input

                    id="title"

                    type="text"

                    value={title}

                    onChange={(event) =>
                        setTitle(event.target.value)
                    }

                    placeholder="Enter project title"

                    required

                />


            </div>




            <div className="form-group">

                <label htmlFor="description">
                    Description
                </label>


                <textarea

                    id="description"

                    value={description}

                    onChange={(event) =>
                        setDescription(event.target.value)
                    }

                    placeholder="Describe your project and what you want to build..."

                    rows={6}

                    required

                />


            </div>




            <div className="form-group">

                <label htmlFor="domain">
                    Domain
                </label>


                <input

                    id="domain"

                    type="text"

                    value={domain}

                    onChange={(event) =>
                        setDomain(event.target.value)
                    }

                    placeholder="e.g. Web Development"

                    required

                />


            </div>





            <div className="form-row">


                <div className="form-group">


                    <label htmlFor="maxMembers">
                        Maximum Members
                    </label>


                    <input

                        id="maxMembers"

                        type="number"

                        min="2"

                        max="20"

                        value={maxMembers}

                        onChange={(event) =>
                            setMaxMembers(
                                event.target.value
                            )
                        }

                        placeholder="e.g. 4"

                        required

                    />


                </div>





                <div className="form-group">


                    <label htmlFor="durationWeeks">
                        Duration (weeks)
                    </label>


                    <input

                        id="durationWeeks"

                        type="number"

                        min="1"

                        max="52"

                        value={durationWeeks}

                        onChange={(event) =>
                            setDurationWeeks(
                                event.target.value
                            )
                        }

                        required

                    />


                </div>


            </div>





            <div className="form-group">


                <label htmlFor="deadline">
                    Deadline
                </label>


                <input

                    id="deadline"

                    type="date"

                    value={deadline}

                    onChange={(event) =>
                        setDeadline(
                            event.target.value
                        )
                    }

                />


            </div>





            {
                error && (

                    <p className="form-error">

                        {error}

                    </p>

                )
            }





            <button

                type="submit"

                className="auth-submit"

                disabled={isSubmitting}

            >

                {
                    isSubmitting

                        ? "Creating Project..."

                        : (

                            <>

                                <Plus size={18} />

                                Create Project

                            </>

                        )
                }


            </button>



        </form>

    );

};



export default ProjectForm;
