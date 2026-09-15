import {
    useState,
    type FormEvent,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    Mail,
    Lock,
    LogIn,
    Eye,
    EyeOff,
} from "lucide-react";

import {
    useAuthContext,
} from "../../context/AuthContext";

import type {
    LoginRequest,
} from "../../types/auth";


function Login() {

    const navigate = useNavigate();


    const {
        login,
    } = useAuthContext();


    const [
        formData,
        setFormData,
    ] = useState<LoginRequest>({

        email: "",

        password: "",

    });


    const [
        showPassword,
        setShowPassword,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState("");


    const [
        isLoading,
        setIsLoading,
    ] = useState(false);


    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement
        >
    ) => {

        const {
            name,
            value,
        } = event.target;


        setFormData({

            ...formData,

            [name]: value,

        });

    };


    const handleSubmit = async (
        event: FormEvent
    ) => {

        event.preventDefault();

        setError("");


        try {

            setIsLoading(true);


            await login(formData);


            navigate("/dashboard");


        } catch {

            setError(
                "Invalid email or password."
            );


        } finally {

            setIsLoading(false);

        }

    };


    return (

        <div className="auth-page">


            <div className="auth-card">


                <div className="auth-header">


                    <div className="auth-icon">


                        <LogIn
                            size={24}
                        />


                    </div>


                    <h2>

                        Welcome back

                    </h2>


                    <p>

                        Log in to continue building
                        with your campus community.

                    </p>


                </div>



                {error && (

                    <div className="auth-error">

                        {error}

                    </div>

                )}



                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >


                    <div className="form-group">


                        <label
                            htmlFor="email"
                        >

                            Email Address

                        </label>


                        <div className="input-wrapper">


                            <Mail
                                size={18}
                            />


                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />


                        </div>


                    </div>



                    <div className="form-group">


                        <label
                            htmlFor="password"
                        >

                            Password

                        </label>


                        <div className="input-wrapper">


                            <Lock
                                size={18}
                            />


                            <input
                                id="password"
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showPassword ? (

                                    <EyeOff
                                        size={18}
                                    />

                                ) : (

                                    <Eye
                                        size={18}
                                    />

                                )}

                            </button>


                        </div>


                    </div>



                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={isLoading}
                    >

                        {isLoading
                            ? "Logging in..."
                            : "Log In"
                        }

                    </button>


                </form>



                <p
                    className="auth-footer-text"
                >

                    Don't have an account?


                    {" "}


                    <Link
                        to="/register"
                    >

                        Create one

                    </Link>


                </p>


            </div>


        </div>

    );

}


export default Login;
