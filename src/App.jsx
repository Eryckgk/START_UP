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

import Login from "./pages/Login/Login.jsx"
import Register from "./pages/Register/Register.jsx"
import Home from "./pages/Home/Home.jsx"
import Explore from "./pages/Explore/Explore.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Startup from "./pages/Startup/Startup.jsx"
import CreateStartup from "./pages/CreateStartup/CreateStartup.jsx"
import Communities from "./pages/Communities/Communities.jsx"
import Messages from "./pages/Messages/Messages.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"

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