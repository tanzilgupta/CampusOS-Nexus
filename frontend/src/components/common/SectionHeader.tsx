import type {
    ReactNode,
} from "react";

import "./SectionHeader.css";


interface SectionHeaderProps {

    title:string;

    description?:string;

    action?:ReactNode;

    icon?:ReactNode;

}


const SectionHeader = ({
    title,
    description,
    action,
    icon,
}:SectionHeaderProps)=>{


    return (

        <div className="section-header">


            <div className="section-header-content">


                {
                    icon &&
                    <div className="section-header-icon">
                        {icon}
                    </div>
                }



                <div>

                    <h2>
                        {title}
                    </h2>


                    {
                        description &&
                        <p>
                            {description}
                        </p>
                    }


                </div>


            </div>




            {
                action &&
                <div className="section-header-action">

                    {action}

                </div>
            }



        </div>

    );

};


export default SectionHeader;