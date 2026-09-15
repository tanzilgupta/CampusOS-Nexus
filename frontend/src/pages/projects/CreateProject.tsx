import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    ArrowLeft,
    Plus,
    Sparkles,
} from "lucide-react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import {
    createProject,
} from "../../services/projectService";

import skillService from "../../services/skillService";


interface Skill {

    id: number;

    name: string;

}


type ProjectStatus =
    | "OPEN"
    | "IN_PROGRESS"
    | "CLOSED"
    | "COMPLETED";



const CreateProject = () => {


    const navigate =
        useNavigate();



    const [
        skills,
        setSkills,
    ] = useState<Skill[]>([]);



    const [
        selectedSkills,
        setSelectedSkills,
    ] = useState<number[]>([]);



    const [
        formData,
        setFormData,
    ] = useState({

        title: "",

        description: "",

        domain: "",

        maxMembers: 4,

        deadline: "",

        durationWeeks: 12,

        status: "OPEN" as ProjectStatus,

    });



    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);



    const [
        error,
        setError,
    ] = useState("");





    useEffect(() => {


        const loadSkills = async () => {


            try {


                const data =
                    await skillService.getAllSkills();


                setSkills(data);


            } catch {


                setError(
                    "Unable to load skills."
                );


            }


        };


        loadSkills();


    }, []);






    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {


        const {
            name,
            value,
        } = event.target;



        setFormData(previous => ({

            ...previous,


            [name]:

                name === "maxMembers" ||
                name === "durationWeeks"

                    ? Number(value)

                    : value,


        }));

    };






    const toggleSkill = (
        id:number
    ) => {


        setSelectedSkills(previous =>


            previous.includes(id)


                ? previous.filter(
                    skillId =>
                        skillId !== id
                )


                : [
                    ...previous,
                    id
                ]


        );

    };







    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {


        event.preventDefault();



        if (
            !formData.title.trim() ||
            !formData.description.trim() ||
            !formData.domain.trim()
        ) {


            setError(
                "Please fill all required fields."
            );


            return;

        }




        try {


            setIsSubmitting(true);

            setError("");



            await createProject({

                title:
                    formData.title.trim(),


                description:
                    formData.description.trim(),


                domain:
                    formData.domain.trim(),


                maxMembers:
                    formData.maxMembers,


                deadline:
                    formData.deadline,


                durationWeeks:
                    formData.durationWeeks,


                status:
                    formData.status,


                requiredSkillIds:
                    selectedSkills,

            });



            navigate(
                "/projects"
            );


        } catch {


            setError(
                "Unable to create project."
            );


        } finally {


            setIsSubmitting(false);


        }


    };






    return (

        <main className="page-shell">


            <div className="page-container narrow-container">



                <button

                    className="back-button"

                    onClick={() =>
                        navigate("/projects")
                    }

                >

                    <ArrowLeft size={18}/>

                    Back to projects


                </button>





                <div className="page-heading">


                    <div>


                        <span className="eyebrow">

                            PROJECT STUDIO

                        </span>



                        <h1>

                            Turn an idea into a team.

                        </h1>



                        <p>

                            Define your project and find collaborators.

                        </p>


                    </div>



                    <Sparkles
                        size={34}
                        className="heading-icon"
                    />


                </div>






                <Card className="form-card">


                    {
                        error && (

                            <div className="form-error">

                                {error}

                            </div>

                        )
                    }





                    <form onSubmit={handleSubmit}>


                        <div className="form-group">

                            <label>
                                Project title
                            </label>


                            <input

                                name="title"

                                value={formData.title}

                                onChange={handleChange}

                                required

                            />

                        </div>






                        <div className="form-group">

                            <label>
                                Description
                            </label>


                            <textarea

                                name="description"

                                value={formData.description}

                                onChange={handleChange}

                                rows={4}

                                required

                            />


                        </div>






                        <div className="form-grid">


                            <div className="form-group">


                                <label>
                                    Domain
                                </label>


                                <input

                                    name="domain"

                                    value={formData.domain}

                                    onChange={handleChange}

                                    placeholder="e.g. Web Development"

                                    required

                                />


                            </div>





                            <div className="form-group">


                                <label>
                                    Team Size
                                </label>


                                <input

                                    type="number"

                                    name="maxMembers"

                                    value={formData.maxMembers}

                                    onChange={handleChange}

                                    min="2"

                                    max="20"

                                    required

                                />


                            </div>


                        </div>







                        <div className="form-grid">


                            <div className="form-group">


                                <label>
                                    Duration (weeks)
                                </label>


                                <input

                                    type="number"

                                    name="durationWeeks"

                                    value={formData.durationWeeks}

                                    onChange={handleChange}

                                    min="1"

                                    max="52"

                                    required

                                />


                            </div>






                            <div className="form-group">


                                <label>
                                    Deadline
                                </label>


                                <input

                                    type="date"

                                    name="deadline"

                                    value={formData.deadline}

                                    onChange={handleChange}

                                />


                            </div>


                        </div>






                        <div className="form-group">


                            <label>
                                Required Skills
                            </label>


                            <p className="form-help">

                                Select skills needed for your project.

                            </p>



                            <div className="skill-selector">


                                {
                                    skills.map(skill => (

                                        <button

                                            key={skill.id}

                                            type="button"

                                            className={
                                                selectedSkills.includes(skill.id)
                                                ? "skill-pill selected"
                                                : "skill-pill"
                                            }


                                            onClick={() =>
                                                toggleSkill(skill.id)
                                            }

                                        >

                                            {skill.name}

                                        </button>


                                    ))
                                }


                            </div>


                        </div>







                        <div className="form-actions">


                            <Button

                                type="button"

                                variant="secondary"

                                onClick={() =>
                                    navigate("/projects")
                                }

                            >

                                Cancel


                            </Button>






                            <Button

                                type="submit"

                                disabled={isSubmitting}

                            >

                                <Plus size={18}/>


                                {
                                    isSubmitting
                                    ? "Creating..."
                                    : "Create Project"
                                }


                            </Button>


                        </div>



                    </form>



                </Card>



            </div>



        </main>

    );

};


export default CreateProject;