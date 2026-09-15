import "./Footer.css";

import {
    ArrowUpRight,
    Sparkles,
    Code2,
    ExternalLink,
} from "lucide-react";


const Footer = () => {

    return (

        <footer className="site-footer">


            <div className="footer-inner">



                <div className="footer-brand">


                    <div className="footer-logo">


                        <div className="footer-logo-icon">


                            <Sparkles
                                size={18}
                                strokeWidth={2.5}
                            />


                        </div>



                        <span>
                            CampusOS Nexus
                        </span>


                    </div>




                    <p>

                        An intelligent student collaboration
                        platform that helps students find
                        teammates, build projects and showcase
                        their technical journey.

                    </p>




                    <div className="footer-tech">


                        <Code2 size={16}/>


                        <span>

                            React • Spring Boot • PostgreSQL

                        </span>


                    </div>



                </div>







                <div className="footer-links-wrapper">



                    <div className="footer-column">


                        <h4>
                            Platform
                        </h4>




                        <a href="/projects">

                            Explore Projects

                        </a>




                        <a href="/register">

                            Create Profile

                        </a>




                        <a href="/login">

                            Join Community

                        </a>



                    </div>







                    <div className="footer-column">


                        <h4>
                            Connect
                        </h4>




                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                        >


                            <ExternalLink size={15}/>


                            Github


                            <ArrowUpRight size={14}/>


                        </a>







                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                        >


                            <ExternalLink size={15}/>


                            LinkedIn


                            <ArrowUpRight size={14}/>


                        </a>



                    </div>



                </div>



            </div>








            <div className="footer-bottom">


                <span>

                    © {new Date().getFullYear()}
                    {" "}
                    CampusOS Nexus

                </span>




                <span>

                    Built for student collaboration 🚀

                </span>


            </div>




        </footer>

    );

};


export default Footer;