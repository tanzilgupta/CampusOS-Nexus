import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import {
    useAuthContext,
} from "../../context/AuthContext";

import {
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
} from "../../services/portfolioService";

import type {
    Portfolio as PortfolioData,
    PortfolioRequest,
} from "../../types/portfolio";


const Portfolio = () => {

    const {
        user,
    } = useAuthContext();


    const [
        portfolio,
        setPortfolio,
    ] = useState<PortfolioData | null>(null);


    const [
        formData,
        setFormData,
    ] = useState<PortfolioRequest>({

        title: "",

        description: "",

        projectUrl: "",

        imageUrl: "",

    });


    const [
        isEditing,
        setIsEditing,
    ] = useState(false);


    const [
        isLoading,
        setIsLoading,
    ] = useState(true);


    const [
        isSaving,
        setIsSaving,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState("");


    useEffect(() => {

        const loadPortfolio =
            async (): Promise<void> => {

                if (!user) {

                    setIsLoading(false);

                    return;

                }


                try {

                    const data =
                        await getPortfolio(
                            user.id
                        );


                    setPortfolio(
                        data
                    );


                    setFormData({

                        title:
                            data.title,

                        description:
                            data.description,

                        projectUrl:
                            data.projectUrl,

                        imageUrl:
                            data.imageUrl,

                    });

                } catch {

                    setPortfolio(
                        null
                    );

                } finally {

                    setIsLoading(
                        false
                    );

                }

            };


        loadPortfolio();

    }, [
        user,
    ]);


    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ): void => {

        const {
            name,
            value,
        } = event.target;


        setFormData(
            (
                previous
            ) => ({

                ...previous,

                [name]:
                    value,

            })
        );

    };


    const handleSubmit = async (
        event:
            FormEvent<HTMLFormElement>
    ): Promise<void> => {

        event.preventDefault();


        if (!user) {

            return;

        }


        setIsSaving(
            true
        );


        setError(
            ""
        );


        try {

            let savedPortfolio:
                PortfolioData;


            if (portfolio) {

                savedPortfolio =
                    await updatePortfolio(
                        user.id,
                        formData
                    );

            } else {

                savedPortfolio =
                    await createPortfolio(
                        user.id,
                        formData
                    );

            }


            setPortfolio(
                savedPortfolio
            );


            setIsEditing(
                false
            );

        } catch {

            setError(
                "Unable to save portfolio."
            );

        } finally {

            setIsSaving(
                false
            );

        }

    };


    const handleDelete =
        async (): Promise<void> => {

            if (
                !user ||
                !portfolio
            ) {

                return;

            }


            try {

                await deletePortfolio(
                    user.id
                );


                setPortfolio(
                    null
                );


                setFormData({

                    title: "",

                    description: "",

                    projectUrl: "",

                    imageUrl: "",

                });

            } catch {

                setError(
                    "Unable to delete portfolio."
                );

            }

        };


    if (isLoading) {

        return (

            <div
                className="profile-loading"
            >

                Loading portfolio...

            </div>

        );

    }


    return (

        <main
            className="page-shell"
        >

            <div
                className="page-container"
            >

                <div
                    className="page-heading"
                >

                    <div>

                        <p
                            className="eyebrow"
                        >

                            PORTFOLIO

                        </p>


                        <h1>

                            Showcase your work.

                        </h1>


                        <p>

                            Create a simple portfolio
                            to highlight your projects
                            and achievements.

                        </p>

                    </div>


                    {portfolio &&
                        !isEditing && (

                            <button
                                type="button"
                                className="profile-action-button"
                                onClick={() =>
                                    setIsEditing(
                                        true
                                    )
                                }
                            >

                                Edit Portfolio

                            </button>

                        )}

                </div>


                {error && (

                    <div
                        className="form-error"
                    >

                        {error}

                    </div>

                )}


                {!portfolio &&
                    !isEditing && (

                        <div
                            className="empty-dashboard-state"
                        >

                            <h2>

                                No portfolio yet

                            </h2>


                            <p>

                                Create your portfolio
                                to showcase your work.

                            </p>


                            <button
                                type="button"
                                className="profile-action-button"
                                onClick={() =>
                                    setIsEditing(
                                        true
                                    )
                                }
                            >

                                Create Portfolio

                            </button>

                        </div>

                    )}


                {portfolio &&
                    !isEditing && (

                        <div
                            className="profile-card"
                        >

                            <h2>

                                {portfolio.title}

                            </h2>


                            <p
                                className="profile-bio"
                            >

                                {
                                    portfolio.description
                                }

                            </p>


                            {portfolio.projectUrl && (

                                <a
                                    href={
                                        portfolio.projectUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="profile-outline-button"
                                >

                                    View Project

                                </a>

                            )}


                            {portfolio.imageUrl && (

                                <img
                                    src={
                                        portfolio.imageUrl
                                    }
                                    alt={
                                        portfolio.title
                                    }
                                    style={{
                                        width:
                                            "100%",

                                        marginTop:
                                            "20px",

                                        borderRadius:
                                            "14px",
                                    }}
                                />

                            )}


                            <button
                                type="button"
                                className="profile-cancel-button"
                                onClick={
                                    handleDelete
                                }
                                style={{
                                    marginTop:
                                        "20px",
                                }}
                            >

                                Delete Portfolio

                            </button>

                        </div>

                    )}


                {isEditing && (

                    <form
                        className="profile-card"
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div
                            className="form-group"
                        >

                            <label
                                htmlFor="title"
                            >

                                Portfolio Title

                            </label>


                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        <div
                            className="form-group"
                            style={{
                                marginTop:
                                    "20px",
                            }}
                        >

                            <label
                                htmlFor="description"
                            >

                                Description

                            </label>


                            <textarea
                                id="description"
                                name="description"
                                rows={6}
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div
                            className="form-group"
                            style={{
                                marginTop:
                                    "20px",
                            }}
                        >

                            <label
                                htmlFor="projectUrl"
                            >

                                Project URL

                            </label>


                            <input
                                id="projectUrl"
                                type="url"
                                name="projectUrl"
                                value={
                                    formData.projectUrl
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div
                            className="form-group"
                            style={{
                                marginTop:
                                    "20px",
                            }}
                        >

                            <label
                                htmlFor="imageUrl"
                            >

                                Image URL

                            </label>


                            <input
                                id="imageUrl"
                                type="url"
                                name="imageUrl"
                                value={
                                    formData.imageUrl
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div
                            className="form-actions"
                        >

                            <button
                                type="button"
                                className="profile-cancel-button"
                                onClick={() =>
                                    setIsEditing(
                                        false
                                    )
                                }
                            >

                                Cancel

                            </button>


                            <button
                                type="submit"
                                className="profile-action-button"
                                disabled={
                                    isSaving
                                }
                            >

                                {isSaving
                                    ? "Saving..."
                                    : "Save Portfolio"}

                            </button>

                        </div>

                    </form>

                )}

            </div>

        </main>

    );

};


export default Portfolio;