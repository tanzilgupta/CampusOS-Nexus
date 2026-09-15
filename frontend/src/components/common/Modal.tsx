import type {
    ReactNode,
} from "react";

import {
    useEffect,
} from "react";

import {
    X,
} from "lucide-react";

import "./Modal.css";


interface ModalProps {

    isOpen:boolean;

    onClose:()=>void;

    title:string;

    children:ReactNode;

    size?:
    | "sm"
    | "md"
    | "lg";

}



const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size="md",
}:ModalProps)=>{


useEffect(()=>{


    const handleEscape = (
        event:KeyboardEvent
    )=>{


        if(event.key==="Escape"){

            onClose();

        }


    };



    if(isOpen){

        window.addEventListener(
            "keydown",
            handleEscape
        );

    }



    return ()=>{

        window.removeEventListener(
            "keydown",
            handleEscape
        );

    };


},[
    isOpen,
    onClose,
]);




if(!isOpen){

    return null;

}




return (

    <div

        className="modal-overlay"

        onClick={onClose}

    >


        <div

            className={`
                modal-container
                modal-${size}
            `}

            onClick={
                event=>event.stopPropagation()
            }

        >


            <div className="modal-header">


                <h2>

                    {title}

                </h2>



                <button

                    className="modal-close"

                    onClick={onClose}

                    aria-label="Close modal"

                >

                    <X size={20}/>


                </button>


            </div>




            <div className="modal-body">

                {children}

            </div>



        </div>


    </div>

);


};


export default Modal;