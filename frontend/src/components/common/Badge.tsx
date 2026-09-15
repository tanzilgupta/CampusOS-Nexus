import type {
    ReactNode,
} from "react";


interface BadgeProps {

    children: ReactNode;


    variant?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "neutral";


    size?:
    | "sm"
    | "md";


    icon?: ReactNode;

}



const Badge = ({
    children,
    variant = "primary",
    size = "md",
    icon,
}: BadgeProps) => {


    const variants = {

        primary:
            "bg-indigo-500/10 text-indigo-500",

        success:
            "bg-green-500/10 text-green-600",

        warning:
            "bg-amber-500/10 text-amber-600",

        danger:
            "bg-red-500/10 text-red-600",

        neutral:
            "bg-slate-500/10 text-slate-500",

    };


    const sizes = {

        sm:
            "px-2.5 py-1 text-xs",

        md:
            "px-3.5 py-1.5 text-sm",

    };



    return (

        <span
            className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                font-semibold
                whitespace-nowrap
                transition-all
                duration-200
                hover:-translate-y-0.5

                ${variants[variant]}

                ${sizes[size]}
            `}
        >

            {
                icon &&
                <span className="flex items-center">
                    {icon}
                </span>
            }


            {children}


        </span>

    );

};


export default Badge;