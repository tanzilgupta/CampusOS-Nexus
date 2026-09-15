import {
    useEffect,
    useState,
    type ChangeEvent,
} from "react";

import {
    Mail,
    GraduationCap,
    MapPin,
    Code2,
    BriefcaseBusiness,
    ExternalLink,
    Edit3,
    Save,
    X,
    Plus,
    Trash2,
} from "lucide-react";

import {
    useAuthContext,
} from "../../context/AuthContext";

import profileService from "../../services/profileService";

import skillService from "../../services/skillService";

import type {
    Profile as ProfileType,
    ProfileRequest,
} from "../../types/profile";

import type {
    Skill,
    SkillRequest,
} from "../../types/skill";


const emptyProfile: ProfileRequest = {
    fullName: "",
    bio: "",
    university: "",
    degree: "",
    year: "",
    branch: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
    resumeUrl: "",
    availability: "",
    interests: [],
};


const emptySkill: SkillRequest = {
    name: "",
    category: "",
    proficiency: "",
    evidence: "",
};


const Profile = () => {

    const { user } = useAuthContext();

    const [profile, setProfile] =
        useState<ProfileType | null>(null);

    const [formData, setFormData] =
        useState<ProfileRequest>({
            ...emptyProfile,
        });

    const [skills, setSkills] =
        useState<Skill[]>([]);

    const [isEditing, setIsEditing] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [showSkillForm, setShowSkillForm] =
        useState(false);

    const [skillForm, setSkillForm] =
        useState<SkillRequest>({
            ...emptySkill,
        });

    const userId = user?.id;


    useEffect(() => {

        const loadProfile = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await profileService.getProfile();

                setProfile(data);

                setFormData({
                    fullName: data.fullName || "",
                    bio: data.bio || "",
                    university: data.university || "",
                    degree: data.degree || "",
                    year: data.year || "",
                    branch: data.branch || "",
                    githubUrl: data.githubUrl || "",
                    linkedinUrl: data.linkedinUrl || "",
                    portfolioUrl: data.portfolioUrl || "",
                    resumeUrl: data.resumeUrl || "",
                    availability: data.availability || "",
                    interests: data.interests || [],
                });

            } catch {

                setProfile(null);

            } finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, []);


    useEffect(() => {

        if (!userId) return;

        const loadSkills = async () => {

            try {

                const data =
                    await skillService.getSkills(userId);

                setSkills(data);

            } catch {

                setSkills([]);

            }

        };

        loadSkills();

    }, [userId]);


    const handleInputChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value,
        } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: name === "interests"
                ? value.split(",").map(interest => interest.trim()).filter(Boolean)
                : value,
        }));

    };


    const handleSaveProfile = async () => {

        try {

            setSaving(true);
            setError("");

            const savedProfile = profile
                ? await profileService.updateProfile(formData)
                : await profileService.createProfile(formData);

            setProfile(savedProfile);

            setFormData({
                fullName: savedProfile.fullName || "",
                bio: savedProfile.bio || "",
                university: savedProfile.university || "",
                degree: savedProfile.degree || "",
                year: savedProfile.year || "",
                branch: savedProfile.branch || "",
                githubUrl: savedProfile.githubUrl || "",
                linkedinUrl: savedProfile.linkedinUrl || "",
                portfolioUrl: savedProfile.portfolioUrl || "",
                resumeUrl: savedProfile.resumeUrl || "",
                availability: savedProfile.availability || "",
                interests: savedProfile.interests || [],
            });

            setIsEditing(false);

        } catch {

            setError(
                "Unable to save your profile. Please try again."
            );

        } finally {

            setSaving(false);

        }

    };


    const handleCancelEditing = () => {

        setIsEditing(false);
        setError("");

        if (!profile) return;

        setFormData({
            fullName: profile.fullName || "",
            bio: profile.bio || "",
            university: profile.university || "",
            degree: profile.degree || "",
            year: profile.year || "",
            branch: profile.branch || "",
            githubUrl: profile.githubUrl || "",
            linkedinUrl: profile.linkedinUrl || "",
            portfolioUrl: profile.portfolioUrl || "",
            resumeUrl: profile.resumeUrl || "",
            availability: profile.availability || "",
            interests: profile.interests || [],
        });

    };


    const handleSkillInputChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value,
        } = event.target;

        setSkillForm(previous => ({
            ...previous,
            [name]: value,
        }));

    };


    const handleAddSkill = async () => {

        if (!userId) return;

        if (
            !skillForm.name ||
            !skillForm.category ||
            !skillForm.proficiency
        ) {

            setError(
                "Please complete the required skill fields."
            );

            return;

        }

        try {

            setError("");

            const newSkill =
                await skillService.addSkill(
                    userId,
                    skillForm
                );

            setSkills(previous => [
                ...previous,
                newSkill,
            ]);

            setSkillForm({
                ...emptySkill,
            });

            setShowSkillForm(false);

        } catch {

            setError(
                "Unable to add skill."
            );

        }

    };


    const handleDeleteSkill = async (
        skillId: number
    ) => {

        try {

            setError("");

            await skillService.deleteSkill(
                skillId
            );

            setSkills(previous =>
                previous.filter(
                    skill => skill.id !== skillId
                )
            );

        } catch {

            setError(
                "Unable to delete skill."
            );

        }

    };


    if (loading) {

        return (

            <div className="profile-page">

                <div className="profile-loading">

                    Loading profile...

                </div>

            </div>

        );

    }


    return (

        <div className="profile-page">

            <div className="profile-container">

                <div className="profile-page-header">

                    <div>

                        <p className="profile-eyebrow">
                            YOUR IDENTITY
                        </p>

                        <h1>
                            Student Profile
                        </h1>

                        <p className="profile-subtitle">
                            Build a profile that shows what you can
                            actually contribute to a project.
                        </p>

                    </div>


                    {!isEditing ? (

                        <button
                            className="profile-action-button"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >

                            <Edit3 size={17} />

                            Edit Profile

                        </button>

                    ) : (

                        <div className="profile-action-group">

                            <button
                                className="profile-cancel-button"
                                onClick={
                                    handleCancelEditing
                                }
                            >

                                <X size={17} />

                                Cancel

                            </button>


                            <button
                                className="profile-action-button"
                                onClick={
                                    handleSaveProfile
                                }
                                disabled={saving}
                            >

                                <Save size={17} />

                                {saving
                                    ? "Saving..."
                                    : "Save Profile"}

                            </button>

                        </div>

                    )}

                </div>


                {error && (

                    <div className="profile-error">

                        {error}

                    </div>

                )}


                <div className="profile-grid">


                    <section className="profile-card profile-overview-card">

                        <div className="profile-avatar-large">

                            {(
                                formData.fullName ||
                                user?.name ||
                                "U"
                            )
                                .charAt(0)
                                .toUpperCase()}

                        </div>


                        <h2>

                            {formData.fullName ||
                                user?.name ||
                                "Complete your profile"}

                        </h2>


                        <p className="profile-email">

                            <Mail size={15} />

                            {user?.email}

                        </p>


                        {formData.bio && (

                            <p className="profile-bio">

                                {formData.bio}

                            </p>

                        )}


                        <div className="profile-quick-info">

                            {formData.university && (

                                <span>

                                    <GraduationCap size={16} />

                                    {formData.university}

                                </span>

                            )}


                            {formData.branch && (

                                <span>

                                    <MapPin size={16} />

                                    {formData.branch}

                                </span>

                            )}

                        </div>


                        <div className="profile-links">

                            {formData.githubUrl && (

                                <a
                                    href={
                                        formData.githubUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <Code2 size={17} />

                                    GitHub

                                    <ExternalLink size={13} />

                                </a>

                            )}


                            {formData.linkedinUrl && (

                                <a
                                    href={
                                        formData.linkedinUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <BriefcaseBusiness
                                        size={17}
                                    />

                                    LinkedIn

                                    <ExternalLink size={13} />

                                </a>

                            )}


                            {formData.portfolioUrl && (

                                <a
                                    href={
                                        formData.portfolioUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <ExternalLink size={17} />

                                    Portfolio

                                </a>

                            )}

                        </div>

                    </section>


                    <section className="profile-card">

                        <div className="profile-section-heading">

                            <div>

                                <p className="profile-eyebrow">
                                    BACKGROUND
                                </p>

                                <h2>
                                    Academic Details
                                </h2>

                            </div>

                        </div>


                        {isEditing ? (

                            <div className="profile-form-grid">

                                <ProfileInput
                                    label="Full Name"
                                    name="fullName"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                />

                                <ProfileInput
                                    label="University"
                                    name="university"
                                    value={
                                        formData.university
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                />

                                <ProfileInput
                                    label="Degree"
                                    name="degree"
                                    value={
                                        formData.degree
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                />

                                <ProfileInput
                                    label="Year"
                                    name="year"
                                    value={
                                        formData.year
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                />

                                <ProfileInput
                                    label="Branch"
                                    name="branch"
                                    value={
                                        formData.branch
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                />

                                <ProfileInput
                                    label="Availability"
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Weekends, 8 hours/week"
                                />

                                <ProfileInput
                                    label="Interests"
                                    name="interests"
                                    value={formData.interests.join(", ")}
                                    onChange={handleInputChange}
                                    placeholder="e.g. AI, FinTech, Healthcare"
                                />


                                <div className="profile-form-field profile-full-width">

                                    <label>
                                        Bio
                                    </label>

                                    <textarea
                                        name="bio"
                                        value={
                                            formData.bio
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        rows={4}
                                        placeholder="Tell collaborators what you are interested in building."
                                    />

                                </div>

                            </div>

                        ) : (

                            <div className="profile-details-grid">

                                <DetailItem
                                    label="University"
                                    value={
                                        formData.university
                                    }
                                />

                                <DetailItem
                                    label="Degree"
                                    value={
                                        formData.degree
                                    }
                                />

                                <DetailItem
                                    label="Year"
                                    value={
                                        formData.year
                                    }
                                />

                                <DetailItem
                                    label="Branch"
                                    value={
                                        formData.branch
                                    }
                                />

                                <DetailItem
                                    label="Availability"
                                    value={formData.availability}
                                />

                                <DetailItem
                                    label="Interests"
                                    value={formData.interests.join(", ")}
                                />

                            </div>

                        )}

                    </section>

                </div>


                <section className="profile-card profile-skills-card">

                    <div className="profile-section-heading">

                        <div>

                            <p className="profile-eyebrow">
                                CAPABILITY
                            </p>

                            <h2>
                                Skills & Evidence
                            </h2>

                            <p>
                                Your skills become more valuable when
                                backed by evidence.
                            </p>

                        </div>


                        <button
                            className="profile-outline-button"
                            onClick={() =>
                                setShowSkillForm(
                                    previous => !previous
                                )
                            }
                        >

                            <Plus size={17} />

                            Add Skill

                        </button>

                    </div>


                    {showSkillForm && (

                        <div className="skill-form">

                            <input
                                name="name"
                                value={
                                    skillForm.name
                                }
                                onChange={
                                    handleSkillInputChange
                                }
                                placeholder="Skill name"
                            />


                            <select
                                name="category"
                                value={
                                    skillForm.category
                                }
                                onChange={
                                    handleSkillInputChange
                                }
                            >

                                <option value="">
                                    Category
                                </option>

                                <option value="Programming">
                                    Programming
                                </option>

                                <option value="Frontend">
                                    Frontend
                                </option>

                                <option value="Backend">
                                    Backend
                                </option>

                                <option value="Database">
                                    Database
                                </option>

                                <option value="Design">
                                    Design
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>


                            <select
                                name="proficiency"
                                value={
                                    skillForm.proficiency
                                }
                                onChange={
                                    handleSkillInputChange
                                }
                            >

                                <option value="">
                                    Proficiency
                                </option>

                                <option value="Beginner">
                                    Beginner
                                </option>

                                <option value="Intermediate">
                                    Intermediate
                                </option>

                                <option value="Advanced">
                                    Advanced
                                </option>

                            </select>


                            <input
                                name="evidence"
                                value={
                                    skillForm.evidence
                                }
                                onChange={
                                    handleSkillInputChange
                                }
                                placeholder="Evidence or project"
                            />


                            <button
                                className="profile-action-button"
                                onClick={
                                    handleAddSkill
                                }
                            >

                                Add

                            </button>

                        </div>

                    )}


                    {skills.length === 0 ? (

                        <div className="skills-empty-state">

                            <Code2 size={28} />

                            <p>

                                Add your first skill to start building
                                your capability profile.

                            </p>

                        </div>

                    ) : (

                        <div className="skills-list">

                            {skills.map(skill => (

                                <div
                                    className="skill-item"
                                    key={skill.id}
                                >

                                    <div className="skill-item-main">

                                        <div className="skill-icon">

                                            <Code2 size={18} />

                                        </div>


                                        <div>

                                            <h3>
                                                {skill.name}
                                            </h3>

                                            <p>
                                                {skill.category}
                                                {" • "}
                                                {skill.proficiency}
                                            </p>


                                            {skill.evidence && (

                                                <small>

                                                    Evidence:{" "}
                                                    {skill.evidence}

                                                </small>

                                            )}

                                        </div>

                                    </div>


                                    <button
                                        className="skill-delete-button"
                                        onClick={() =>
                                            handleDeleteSkill(
                                                skill.id
                                            )
                                        }
                                    >

                                        <Trash2 size={16} />

                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {isEditing && (

                    <section className="profile-card">

                        <div className="profile-section-heading">

                            <div>

                                <p className="profile-eyebrow">
                                    PROOF OF WORK
                                </p>

                                <h2>
                                    Professional Links
                                </h2>

                            </div>

                        </div>


                        <div className="profile-form-grid">

                            <ProfileInput
                                label="GitHub URL"
                                name="githubUrl"
                                value={
                                    formData.githubUrl
                                }
                                onChange={
                                    handleInputChange
                                }
                            />

                            <ProfileInput
                                label="LinkedIn URL"
                                name="linkedinUrl"
                                value={
                                    formData.linkedinUrl
                                }
                                onChange={
                                    handleInputChange
                                }
                            />

                            <ProfileInput
                                label="Portfolio URL"
                                name="portfolioUrl"
                                value={
                                    formData.portfolioUrl
                                }
                                onChange={
                                    handleInputChange
                                }
                            />

                            <ProfileInput
                                label="Resume URL"
                                name="resumeUrl"
                                value={
                                    formData.resumeUrl
                                }
                                onChange={
                                    handleInputChange
                                }
                            />

                        </div>

                    </section>

                )}

            </div>

        </div>

    );

};


interface ProfileInputProps {

    label: string;

    name: string;

    value: string;

    placeholder?: string;

    onChange: (
        event: ChangeEvent<HTMLInputElement>
    ) => void;

}


const ProfileInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
}: ProfileInputProps) => (

    <div className="profile-form-field">

        <label>
            {label}
        </label>

        <input
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />

    </div>

);


interface DetailItemProps {

    label: string;

    value: string;

}


const DetailItem = ({
    label,
    value,
}: DetailItemProps) => (

    <div className="profile-detail-item">

        <span>
            {label}
        </span>

        <strong>
            {value || "Not added yet"}
        </strong>

    </div>

);


export default Profile;
