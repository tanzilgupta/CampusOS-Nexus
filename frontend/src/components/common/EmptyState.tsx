import type {
    ReactNode,
} from "react";


import "./EmptyState.css";


interface EmptyStateProps {


    icon?: ReactNode;


    title: string;


    description: string;


    action?: ReactNode;


    className?: string;


}



const EmptyState = ({

    icon,

    title,

    description,

    action,

    className = "",


}: EmptyStateProps) => {



    return (

        <div

            className={`
            
                empty-state

                ${className}

            `}

        >


            {
                icon && (

                    <div

                        className="empty-state-icon"

                    >

                        {icon}


                    </div>

                )
            }



            <h3>

                {title}

            </h3>



            <p>

                {description}

            </p>



            {
                action && (

                    <div

                        className="empty-state-action"

                    >

                        {action}


                    </div>

                )
            }



        </div>

    );


};


export default EmptyState;