import "./LoadingSkeleton.css";


interface LoadingSkeletonProps {


    variant?:
        | "text"
        | "title"
        | "avatar"
        | "card";


    width?: string;


    height?: string;


    className?: string;


}



const LoadingSkeleton = ({

    variant = "text",

    width,

    height,

    className = "",


}: LoadingSkeletonProps) => {



    return (

        <div

            className={`
            
                skeleton

                skeleton-${variant}

                ${className}

            `}


            style={{

                width,

                height,

            }}

        />

    );


};


export default LoadingSkeleton;