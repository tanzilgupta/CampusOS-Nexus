import "./Avatar.css";


interface AvatarProps {


    name?: string;


    imageUrl?: string;


    size?:
        | "sm"
        | "md"
        | "lg"
        | "xl";


    online?: boolean;


    className?: string;


}



const Avatar = ({

    name = "User",

    imageUrl,

    size = "md",

    online = false,

    className = "",


}: AvatarProps) => {



    const initials =

        name

        .split(" ")

        .map(word => word[0])

        .join("")

        .slice(0,2)

        .toUpperCase();



    return (

        <div

            className={`
            
                avatar-wrapper

                avatar-${size}

                ${className}

            `}

        >


            {
                imageUrl ? (

                    <img

                        src={imageUrl}

                        alt={name}

                        className="avatar-image"

                    />

                ) : (

                    <span

                        className="avatar-initial"

                    >

                        {initials}


                    </span>

                )

            }



            {
                online && (

                    <span

                        className="avatar-online"

                    />

                )
            }



        </div>

    );


};



export default Avatar;