import "./Navbar.css";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Link,
    NavLink,
    useNavigate,
} from "react-router-dom";

import {
    Menu,
    X,
    Sun,
    Moon,
    Monitor,
    Sparkles,
} from "lucide-react";

import {
    useAuthContext,
} from "../../context/AuthContext";

import {
    useTheme,
} from "../../context/ThemeContext";


const Navbar = () => {


    const navigate = useNavigate();


    const {
        user,
        isAuthenticated,
        logout,
    } = useAuthContext();


    const {
        theme,
        setTheme,
    } = useTheme();



    const [
        mobileMenuOpen,
        setMobileMenuOpen,
    ] = useState(false);


    const [
        themeMenuOpen,
        setThemeMenuOpen,
    ] = useState(false);



    const themeRef = useRef<HTMLDivElement>(null);



    useEffect(() => {


        const handleOutsideClick = (
            event: MouseEvent
        ) => {


            if (
                themeRef.current &&
                !themeRef.current.contains(
                    event.target as Node
                )
            ) {

                setThemeMenuOpen(false);

            }


        };


        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };


    }, []);



    const handleLogout = () => {


        logout();

        setMobileMenuOpen(false);

        navigate("/");


    };



    const closeMobileMenu = () => {

        setMobileMenuOpen(false);

    };



    const navLinkClass = ({
        isActive,
    }: {
        isActive:boolean;
    }) => {


        return isActive

            ? "nav-link nav-link-active"

            : "nav-link";


    };



    return (

        <header className="navbar">


            <div className="navbar-container">



                <Link
                    to="/"
                    className="brand"
                    onClick={closeMobileMenu}
                >

                    <div className="brand-mark">

                        <Sparkles
                            size={18}
                            strokeWidth={2.5}
                        />

                    </div>


                    <span className="brand-name">

                        CampusOS

                        <span className="brand-accent">
                            Nexus
                        </span>

                    </span>


                </Link>





                <nav className="desktop-nav">


                    <NavLink
                        to="/"
                        className={navLinkClass}
                    >
                        Home
                    </NavLink>



                    <NavLink
                        to="/projects"
                        className={navLinkClass}
                    >
                        Explore Projects
                    </NavLink>



                    {isAuthenticated && (

                        <NavLink
                            to="/dashboard"
                            className={navLinkClass}
                        >
                            Dashboard
                        </NavLink>

                    )}


                </nav>





                <div className="navbar-actions">



                    <div
                        className="theme-selector"
                        ref={themeRef}
                    >


                        <button

                            className="icon-button"

                            aria-label="Change theme"

                            onClick={() =>
                                setThemeMenuOpen(
                                    !themeMenuOpen
                                )
                            }

                        >


                            {
                                theme === "dark"

                                &&

                                <Moon size={18}/>
                            }



                            {
                                theme === "light"

                                &&

                                <Sun size={18}/>
                            }



                            {
                                theme === "system"

                                &&

                                <Monitor size={18}/>
                            }


                        </button>





                        {
                            themeMenuOpen && (

                                <div className="theme-menu">


                                    <button
                                        className={
                                            theme === "light"
                                            ?
                                            "theme-option active"
                                            :
                                            "theme-option"
                                        }

                                        onClick={()=>{
                                            setTheme("light");
                                            setThemeMenuOpen(false);
                                        }}

                                    >

                                        <Sun size={16}/>

                                        Light

                                    </button>



                                    <button
                                        className={
                                            theme === "dark"
                                            ?
                                            "theme-option active"
                                            :
                                            "theme-option"
                                        }

                                        onClick={()=>{
                                            setTheme("dark");
                                            setThemeMenuOpen(false);
                                        }}

                                    >

                                        <Moon size={16}/>

                                        Dark

                                    </button>



                                    <button
                                        className={
                                            theme === "system"
                                            ?
                                            "theme-option active"
                                            :
                                            "theme-option"
                                        }

                                        onClick={()=>{
                                            setTheme("system");
                                            setThemeMenuOpen(false);
                                        }}

                                    >

                                        <Monitor size={16}/>

                                        System

                                    </button>


                                </div>

                            )
                        }


                    </div>





                    {
                        isAuthenticated ? (

                            <>

                                <button

                                    className="user-pill"

                                    onClick={() =>
                                        navigate("/profile")
                                    }

                                >

                                    <span className="user-avatar">

                                        {
                                            user?.name
                                            ?.charAt(0)
                                            .toUpperCase()
                                        }

                                    </span>


                                    <span className="user-name">

                                        {user?.name}

                                    </span>


                                </button>



                                <button

                                    className="logout-button"

                                    onClick={handleLogout}

                                >

                                    Logout

                                </button>


                            </>


                        ) : (

                            <>

                                <Link
                                    to="/login"
                                    className="nav-login"
                                >
                                    Log in
                                </Link>



                                <Link
                                    to="/register"
                                    className="nav-register"
                                >
                                    Get started
                                </Link>

                            </>

                        )
                    }



                </div>





                <button

                    className="mobile-menu-button"

                    aria-label="Toggle menu"

                    onClick={() =>
                        setMobileMenuOpen(
                            !mobileMenuOpen
                        )
                    }

                >

                    {
                        mobileMenuOpen

                        ?

                        <X size={24}/>

                        :

                        <Menu size={24}/>

                    }


                </button>



            </div>





            {
                mobileMenuOpen && (

                    <div className="mobile-menu">


                        <NavLink
                            to="/"
                            className={navLinkClass}
                            onClick={closeMobileMenu}
                        >
                            Home
                        </NavLink>



                        <NavLink
                            to="/projects"
                            className={navLinkClass}
                            onClick={closeMobileMenu}
                        >
                            Explore Projects
                        </NavLink>




                        {
                            isAuthenticated && (

                                <>

                                    <NavLink
                                        to="/dashboard"
                                        className={navLinkClass}
                                        onClick={closeMobileMenu}
                                    >
                                        Dashboard
                                    </NavLink>



                                    <NavLink
                                        to="/profile"
                                        className={navLinkClass}
                                        onClick={closeMobileMenu}
                                    >
                                        Profile
                                    </NavLink>



                                    <button
                                        className="mobile-logout"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                </>

                            )
                        }



                        {
                            !isAuthenticated && (

                                <>

                                    <Link
                                        to="/login"
                                        className="mobile-auth-link"
                                    >
                                        Log in
                                    </Link>



                                    <Link
                                        to="/register"
                                        className="mobile-register-link"
                                    >
                                        Get started
                                    </Link>

                                </>

                            )
                        }



                    </div>

                )
            }



        </header>

    );

};


export default Navbar;