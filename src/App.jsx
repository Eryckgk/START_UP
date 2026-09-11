import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom"

import AuthProvider from "./context/AuthContext"
import useAuth from "./hooks/useAuth"

import AuthLayout from "./layouts/AuthLayout.jsx"
import MainLayout from "./layouts/MainLayout.jsx"

import Login from "./Pages/Login/Login.jsx"
import Register from "./Pages/Register/Register.jsx"

import Home from "./Pages/Home/Home.jsx"
import Explore from "./Pages/Explore/Explore.jsx"
import Profile from "./Pages/Profile/Profile.jsx"
import Startup from "./Pages/Startup/Startup.jsx"
import CreateStartup from "./Pages/CreateStartup/CreateStartup.jsx"
import Communities from "./Pages/Communities/Communities.jsx"
import Messages from "./Pages/Messages/Messages.jsx"
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"

import "./App.css"


function ProtectedRoute({ children }) {

    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div className="app-loading">

                <div className="app-loading-spinner"></div>

                <span>
                    Carregando START_UP...
                </span>

            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    return children
}


function PublicRoute({ children }) {

    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div className="app-loading">

                <div className="app-loading-spinner"></div>

                <span>
                    Carregando START_UP...
                </span>

            </div>
        )
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to="/"
                replace
            />
        )
    }

    return children
}


function App() {

    return (

        <BrowserRouter>

            <AuthProvider>

                <Routes>

                    {/* =========================
                        AUTENTICAÇÃO
                    ========================= */}

                    <Route element={<AuthLayout />}>

                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />

                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />

                    </Route>


                    {/* =========================
                        ÁREA PRINCIPAL
                    ========================= */}

                    <Route
                        element={
                            <ProtectedRoute>
                                <MainLayout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/explore"
                            element={<Explore />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                        <Route
                            path="/startups"
                            element={<Startup />}
                        />

                        <Route
                            path="/startup/:id"
                            element={<Startup />}
                        />

                        <Route
                            path="/create-startup"
                            element={<CreateStartup />}
                        />

                        <Route
                            path="/communities"
                            element={<Communities />}
                        />

                        <Route
                            path="/messages"
                            element={<Messages />}
                        />

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                    </Route>


                    {/* =========================
                        ROTA INEXISTENTE
                    ========================= */}

                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/"
                                replace
                            />
                        }
                    />

                </Routes>

            </AuthProvider>

        </BrowserRouter>
    )
}

export default App