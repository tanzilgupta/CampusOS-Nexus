import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    ArrowLeft,
    Pencil,
    Sparkles,
} from "lucide-react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import {
    getProject,
    updateProject,
} from "../../services/projectService";

import skillService from "../../services/skillService";

import type {
    ProjectRequest,
} from "../../types/project";


interface Skill {
    id: number;
    name: string;
}



const EditProject = () => {


    const navigate = useNavigate();


    const {
        projectId,
    } = useParams();



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
    ] = useState<ProjectRequest>({

        title: "",

        description: "",

        domain: "",

        maxMembers: 4,

        deadline: "",

        durationWeeks: 12,

        status: "OPEN",

        requiredSkillIds: [],

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


        const loadData = async () => {


            if (!projectId) {

                return;

            }


            try {


                const [
                    project,
                    skillData,
                ] = await Promise.all([

                    getProject(
                        Number(projectId)
                    ),

                    skillService.getAllSkills()

                ]);



                setSkills(
                    skillData
                );



                const selectedIds =
                    skillData
                        .filter(skill =>
                            project.requiredSkills?.includes(
                                skill.name
                            )
                        )
                        .map(
                            skill =>
                                skill.id
                        );



                setSelectedSkills(
                    selectedIds
                );



                setFormData({

                    title:
                        project.title,


                    description:
                        project.description,


                    domain:
                        project.domain,


                    maxMembers:
                        project.maxMembers,


                    deadline:
                        project.deadline || "",


                    durationWeeks:
                        project.durationWeeks,


                    status:
                        project.status,


                    requiredSkillIds:
                        selectedIds,

                });



            } catch {


                setError(
                    "Unable to load project."
                );


            }


        };



        loadData();


    }, [projectId]);








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
        id: number
    ) => {


        setSelectedSkills(previous => {


            const updated =

                previous.includes(id)

                    ? previous.filter(
                        skillId =>
                            skillId !== id
                    )

                    : [
                        ...previous,
                        id
                    ];



            setFormData(current => ({

                ...current,

                requiredSkillIds:
                    updated,

            }));


            return updated;


        });


    };








    const handleSubmit =
        async (
            event: FormEvent<HTMLFormElement>
        ) => {


            event.preventDefault();



            if (!projectId) {

                return;

            }



            try {


                setIsSubmitting(true);

                setError("");



                await updateProject(

                    Number(projectId),

                    {

                        ...formData,

                        requiredSkillIds:
                            selectedSkills,

                    }

                );



                navigate(
                    `/projects/${projectId}`
                );



            } catch {


                setError(
                    "Unable to update project."
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
                        navigate(
                            `/projects/${projectId}`
                        )
                    }

                >

                    <ArrowLeft size={18} />

                    Back

                </button>




                <div className="page-heading">

                    <div>

                        <span className="eyebrow">

                            PROJECT STUDIO

                        </span>


                        <h1>

                            Update your project.

                        </h1>


                        <p>

                            Modify details and improve your collaboration space.

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

                                rows={5}

                                value={formData.description}

                                onChange={handleChange}

                                required

                            />

                        </div>





                        <div className="form-group">

                            <label>
                                Required Skills
                            </label>


                            <div className="skill-tags">


                                {skills.map(skill => (

                                    <button

                                        type="button"

                                        key={skill.id}


                                        className={
                                            selectedSkills.includes(skill.id)

                                                ? "skill-tag selected"

                                                : "skill-tag"
                                        }


                                        onClick={() =>
                                            toggleSkill(skill.id)
                                        }

                                    >

                                        {skill.name}

                                    </button>

                                ))}


                            </div>

                        </div>





                        <div className="form-grid">


                            <div className="form-group">

                                <label>
                                    Domain
                                </label>


                                <select

                                    name="domain"

                                    value={formData.domain}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">
                                        Select domain
                                    </option>

                                    <option>
                                        Web Development
                                    </option>

                                    <option>
                                        App Development
                                    </option>

                                    <option>
                                        AI & Machine Learning
                                    </option>

                                    <option>
                                        Data Science
                                    </option>

                                    <option>
                                        Cybersecurity
                                    </option>

                                    <option>
                                        Design
                                    </option>

                                    <option>
                                        Other
                                    </option>


                                </select>

                            </div>





                            <div className="form-group">

                                <label>
                                    Duration
                                </label>


                                <input

                                    type="number"

                                    name="durationWeeks"

                                    min={1}

                                    max={52}

                                    value={formData.durationWeeks}

                                    onChange={handleChange}

                                />

                            </div>





                            <div className="form-group">

                                <label>
                                    Team Size
                                </label>


                                <input

                                    type="number"

                                    name="maxMembers"

                                    min={2}

                                    max={20}

                                    value={formData.maxMembers}

                                    onChange={handleChange}

                                />

                            </div>


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





                        <div className="form-actions">


                            <Button

                                type="button"

                                variant="secondary"

                                onClick={() =>
                                    navigate(
                                        `/projects/${projectId}`
                                    )
                                }

                            >

                                Cancel

                            </Button>





                            <Button

                                type="submit"

                                disabled={isSubmitting}

                            >

                                <Pencil size={18} />


                                {
                                    isSubmitting
                                        ? "Updating..."
                                        : "Update Project"
                                }


                            </Button>


                        </div>



                    </form>


                </Card>


            </div>

        </main>

    );

};


export default EditProject;