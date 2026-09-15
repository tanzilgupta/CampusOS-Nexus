import type {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

import "./Button.css";


interface ButtonProps
extends ButtonHTMLAttributes<HTMLButtonElement> {

    children: ReactNode;


    variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger";


    size?:
    | "sm"
    | "md"
    | "lg";


    loading?: boolean;


    fullWidth?: boolean;


    icon?: ReactNode;

}



const Button = ({

    children,

    variant="primary",

    size="md",

    loading=false,

    fullWidth=false,

    icon,

    className="",

    disabled,

    type="button",

    ...props

}:ButtonProps)=>{


    return (

        <button

            type={type}

            className={`
                campus-button

                button-${variant}

                button-${size}

                ${fullWidth ? "button-full" : ""}

                ${loading ? "button-loading" : ""}

                ${className}
            `}


            disabled={
                disabled || loading
            }


            {...props}

        >


            {
                loading &&
                <span
                    className="button-loader"
                />
            }


            {
                !loading &&
                icon
            }


            {children}


        </button>

    );

};


export default Button;