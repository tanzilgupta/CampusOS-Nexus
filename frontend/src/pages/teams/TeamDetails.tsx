import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    ArrowLeft,
    Users,
    Trash2,
    UserPlus,
} from "lucide-react";

import {
    getTeam,
    getTeamMembers,
    addTeamMember,
    removeTeamMember,
    getTeamGapAnalysis,
} from "../../services/teamService";

import {
    useAuthContext,
} from "../../context/AuthContext";

import type {
    Team,
    TeamMember,
    TeamGapAnalysis,
} from "../../types/team";


const TeamDetails = () => {

    const {
        id,
    } = useParams();


    const navigate =
        useNavigate();


    const {
        user,
    } = useAuthContext();



    const [
        team,
        setTeam,
    ] = useState<Team | null>(null);



    const [
        members,
        setMembers,
    ] = useState<TeamMember[]>([]);

    const [gapAnalysis, setGapAnalysis] = useState<TeamGapAnalysis | null>(null);



    const [
        memberId,
        setMemberId,
    ] = useState("");



    const [
        role,
        setRole,
    ] = useState("Member");



    const [
        loading,
        setLoading,
    ] = useState(true);



    const [
        error,
        setError,
    ] = useState("");





    const loadData = async () => {


        if (!id) {

            navigate("/teams");

            return;

        }



        try {

            setLoading(true);

            setError("");



            const teamData =
                await getTeam(
                    Number(id)
                );



            const memberData =
                await getTeamMembers(
                    Number(id)
                );

            const gapData = await getTeamGapAnalysis(Number(id));



            setTeam(
                teamData
            );


            setMembers(
                memberData
            );

            setGapAnalysis(gapData);



        } catch {


            setError(
                "Unable to load team details."
            );



        } finally {


            setLoading(false);


        }


    };





    useEffect(() => {


        loadData();


    }, [id]);






    const handleAddMember = async () => {


        if (!team || !user) {

            return;

        }



        if (team.createdBy !== user.id) {

            setError(
                "Only team owner can add members."
            );

            return;

        }



        if (!memberId) {

            setError(
                "Enter user ID."
            );

            return;

        }




        try {


            await addTeamMember(

                Number(id),

                Number(memberId),

                {
                    role,
                }

            );



            setMemberId("");

            setRole(
                "Member"
            );



            loadData();



        } catch {


            setError(
                "Unable to add member."
            );


        }


    };






    const handleRemoveMember = async (
        memberId: number
    ) => {


        try {


            await removeTeamMember(
                memberId
            );



            loadData();



        } catch {


            setError(
                "Unable to remove member."
            );


        }


    };






    if (loading) {

        return (

            <div className="profile-loading">

                Loading team...

            </div>

        );

    }






    return (

        <div className="page-shell">


            <div className="page-container">





                <button

                    className="back-button"

                    onClick={() =>
                        navigate("/teams")
                    }

                >

                    <ArrowLeft size={17}/>

                    Back to Teams

                </button>






                {error && (

                    <div className="form-error">

                        {error}

                    </div>

                )}







                {team && (

                    <>


                    <div className="page-heading">


                        <div>


                            <p className="eyebrow">

                                TEAM SPACE

                            </p>



                            <h1>

                                {team.name}

                            </h1>



                            <p>

                                {team.description ||
                                    "No description available."}

                            </p>



                        </div>




                        <Users

                            size={36}

                            className="heading-icon"

                        />



                    </div>








                    <section className="profile-card">


                        <h2>

                            Team Information

                        </h2>




                        <div className="profile-details-grid">



                            <div className="profile-detail-item">

                                <span>
                                    Domain
                                </span>


                                <strong>
                                    {team.domain}
                                </strong>


                            </div>





                            <div className="profile-detail-item">

                                <span>
                                    Project ID
                                </span>


                                <strong>
                                    #{team.projectId}
                                </strong>


                            </div>





                            <div className="profile-detail-item">

                                <span>
                                    Created By
                                </span>


                                <strong>
                                    #{team.createdBy}
                                </strong>


                            </div>



                        </div>



                    </section>

                    {gapAnalysis && (
                        <section className="profile-card">
                            <div className="profile-section-heading">
                                <div>
                                    <p className="profile-eyebrow">TEAM INTELLIGENCE</p>
                                    <h2>Skill Coverage: {gapAnalysis.coveragePercentage}%</h2>
                                </div>
                            </div>
                            <p>{gapAnalysis.recommendation}</p>
                            <div className="skill-tags">
                                {gapAnalysis.coveredSkills.map(skill => (
                                    <span key={skill} className="skill-tag selected">Covered: {skill}</span>
                                ))}
                                {gapAnalysis.missingSkills.map(skill => (
                                    <span key={skill} className="skill-tag">Missing: {skill}</span>
                                ))}
                            </div>
                        </section>
                    )}









                    <section className="profile-card">



                        <div className="profile-section-heading">


                            <div>


                                <p className="profile-eyebrow">

                                    MEMBERS

                                </p>



                                <h2>

                                    Team Members

                                </h2>


                            </div>



                        </div>








                        {
                            team.createdBy === user?.id && (

                                <div className="skill-form">


                                    <input

                                        type="number"

                                        placeholder="User ID"

                                        value={
                                            memberId
                                        }

                                        onChange={
                                            event =>
                                                setMemberId(
                                                    event.target.value
                                                )
                                        }

                                    />




                                    <select

                                        value={
                                            role
                                        }

                                        onChange={
                                            event =>
                                                setRole(
                                                    event.target.value
                                                )
                                        }

                                    >

                                        <option value="Member">
                                            Member
                                        </option>


                                        <option value="Lead">
                                            Lead
                                        </option>


                                        <option value="Developer">
                                            Developer
                                        </option>


                                    </select>





                                    <button

                                        className="profile-action-button"

                                        onClick={
                                            handleAddMember
                                        }

                                    >

                                        <UserPlus size={16}/>

                                        Add


                                    </button>



                                </div>

                            )
                        }









                        {
                            members.length === 0 ? (

                                <p>

                                    No members yet.

                                </p>


                            ) : (



                                <div className="skills-list">



                                    {
                                        members.map(

                                            member => (


                                                <div

                                                    className="skill-item"

                                                    key={
                                                        member.id
                                                    }

                                                >



                                                    <div>


                                                        <h3>

                                                            User #
                                                            {member.userId}

                                                        </h3>



                                                        <p>

                                                            {member.role}

                                                        </p>



                                                    </div>






                                                    {
                                                        team.createdBy === user?.id && (

                                                            <button

                                                                className="skill-delete-button"

                                                                onClick={() =>
                                                                    handleRemoveMember(
                                                                        member.id
                                                                    )
                                                                }

                                                            >

                                                                <Trash2
                                                                    size={16}
                                                                />


                                                            </button>

                                                        )
                                                    }





                                                </div>



                                            )

                                        )

                                    }



                                </div>



                            )
                        }





                    </section>



                    </>

                )}






            </div>


        </div>


    );

};


export default TeamDetails;
