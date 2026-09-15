import "./Loader.css";


interface LoaderProps {

    text?:string;

}



const Loader = ({
    text="Loading...",
}:LoaderProps)=>{


return (

    <div className="loader-wrapper">


        <div className="loader-spinner"/>


        {
            text && (

                <span>

                    {text}

                </span>

            )
        }


    </div>

);


};


export default Loader;