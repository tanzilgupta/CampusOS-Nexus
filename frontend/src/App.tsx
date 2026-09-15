import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import DashboardLayout from "./components/layout/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Projects from "./pages/projects/Projects";
import CreateProject from "./pages/projects/CreateProject";
import EditProject from "./pages/projects/EditProject";
import ProjectDetails from "./pages/projects/ProjectDetails";
import MyProjects from "./pages/projects/MyProjects";
import Recommendations from "./pages/matching/Recommendations";
import StudentProfile from "./pages/profile/StudentProfile";
import Portfolio from "./pages/portfolio/Portfolio";
import Teams from "./pages/teams/Teams";
import CreateTeam from "./pages/teams/CreateTeam";
import TeamDetails from "./pages/teams/TeamDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <DashboardLayout>{children}</DashboardLayout>
        </ProtectedRoute>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/students/:userId" element={<StudentProfile />} />

                    <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
                    <Route path="/my-projects" element={<ProtectedLayout><MyProjects /></ProtectedLayout>} />
                    <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
                    <Route path="/projects/create" element={<ProtectedLayout><CreateProject /></ProtectedLayout>} />
                    <Route path="/projects/:projectId/edit" element={<ProtectedLayout><EditProject /></ProtectedLayout>} />
                    <Route path="/recommendations/:projectId" element={<ProtectedLayout><Recommendations /></ProtectedLayout>} />
                    <Route path="/portfolio" element={<ProtectedLayout><Portfolio /></ProtectedLayout>} />
                    <Route path="/teams" element={<ProtectedLayout><Teams /></ProtectedLayout>} />
                    <Route path="/teams/create" element={<ProtectedLayout><CreateTeam /></ProtectedLayout>} />
                    <Route path="/teams/:id" element={<ProtectedLayout><TeamDetails /></ProtectedLayout>} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;