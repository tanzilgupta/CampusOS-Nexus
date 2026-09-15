import {
    useState,
    type FormEvent,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    Shield,
    Eye,
    EyeOff,
} from "lucide-react";

import {
    useAuthContext,
} from "../../context/AuthContext";

import type {
    RegisterRequest,
} from "../../types/auth";


function Register() {

    const navigate = useNavigate();


    const {
        register,
    } = useAuthContext();


    const [
        formData,
        setFormData,
    ] = useState<RegisterRequest>({

        name: "",

        email: "",

        password: "",

        role: "STUDENT",

    });


    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");


    const [
        showPassword,
        setShowPassword,
    ] = useState(false);


    const [
        showConfirmPassword,
        setShowConfirmPassword,
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
            HTMLInputElement | HTMLSelectElement
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


        if (
            formData.password !==
            confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;

        }


        try {

            setIsLoading(true);


            await register(formData);


            navigate("/login");


        } catch {

            setError(
                "Registration failed. Please try again."
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

                        <User
                            size={24}
                        />

                    </div>


                    <h2>

                        Create your account

                    </h2>


                    <p>

                        Join CampusOS Nexus and
                        start building together.

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
                            htmlFor="name"
                        >

                            Full Name

                        </label>


                        <div className="input-wrapper">


                            <User
                                size={18}
                            />


                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />


                        </div>


                    </div>



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
                                placeholder="Create a password"
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



                    <div className="form-group">


                        <label
                            htmlFor="confirmPassword"
                        >

                            Confirm Password

                        </label>


                        <div className="input-wrapper">


                            <Lock
                                size={18}
                            />


                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                required
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showConfirmPassword ? (

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



                    <div className="form-group">


                        <label
                            htmlFor="role"
                        >

                            Account Type

                        </label>


                        <div className="input-wrapper">


                            <Shield
                                size={18}
                            />


                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >

                                <option value="STUDENT">
                                    Student
                                </option>


                                <option value="MENTOR">
                                    Mentor
                                </option>

                            </select>


                        </div>


                    </div>



                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={isLoading}
                    >

                        {isLoading
                            ? "Creating account..."
                            : "Create Account"
                        }

                    </button>


                </form>



                <p
                    className="auth-footer-text"
                >

                    Already have an account?


                    {" "}


                    <Link
                        to="/login"
                    >

                        Log in

                    </Link>


                </p>


            </div>


        </div>

    );

}


export default Register;
