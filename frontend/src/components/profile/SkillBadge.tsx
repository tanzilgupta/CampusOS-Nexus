import {
    Code2,
} from "lucide-react";


interface SkillBadgeProps {

    skill: string;

    proficiency?: string;

}


const SkillBadge = ({
    skill,
    proficiency,
}: SkillBadgeProps) => {

    return (

        <span
            className="skill-badge"
        >

            <Code2
                size={14}
            />


            <span>

                {skill}

            </span>


            {proficiency && (

                <small>

                    {proficiency}

                </small>

            )}

        </span>

    );

};


export default SkillBadge;