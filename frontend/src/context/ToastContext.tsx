import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";


import type {
    ReactNode
} from "react";



type ToastType =
    | "success"
    | "error"
    | "warning"
    | "info";



interface Toast {

    id: number;

    message: string;

    type: ToastType;

}



interface ToastContextType {

    showToast:

    (
        message: string,
        type?: ToastType
    ) => void;

}



const ToastContext =
    createContext<ToastContextType | null>(null);




interface ToastProviderProps {

    children: ReactNode;

}




export function ToastProvider(
    {
        children
    }: ToastProviderProps

) {


    const [toasts, setToasts] =
        useState<Toast[]>([]);




    const showToast = useCallback(

        (
            message: string,

            type: ToastType = "info"

        ) => {


            const id =
                Date.now();




            setToasts(

                previous => [

                    ...previous,

                    {
                        id,
                        message,
                        type
                    }

                ]

            );




            setTimeout(() => {


                setToasts(

                    previous =>

                        previous.filter(

                            toast =>

                                toast.id !== id

                        )

                );


            }, 3500);


        },

        []

    );





    useEffect(() => {


        const handleSessionExpired = () => {


            showToast(

                "Your session has expired. Please login again.",

                "warning"

            );


        };




        window.addEventListener(

            "sessionExpired",

            handleSessionExpired

        );




        return () => {


            window.removeEventListener(

                "sessionExpired",

                handleSessionExpired

            );


        };


    }, [showToast]);





    return (


        <ToastContext.Provider

            value={{
                showToast
            }}

        >


            {children}





            <div className="toast-container">


                {
                    toasts.map(

                        toast => (


                            <div

                                key={toast.id}

                                className={
                                    `toast toast-${toast.type}`
                                }

                            >

                                {toast.message}


                            </div>


                        )

                    )

                }


            </div>



        </ToastContext.Provider>


    );

}






export function useToast() {


    const context =

        useContext(ToastContext);




    if (!context) {


        throw new Error(

            "useToast must be used inside ToastProvider"

        );


    }




    return context;


}