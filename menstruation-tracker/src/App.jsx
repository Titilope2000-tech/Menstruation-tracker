import { useContext, useState } from "react";
import AuthProvider, { AuthContext } from "./Context/AuthContext";
import Navbar from "./Context/Components/NavBar";
import Login from "./Context/Components/Pages/Login";
import Signup from "./Context/Components/Pages/SignUp";
import Tracker from "./Context/Components/Pages/Tracker";

function AppInner() {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState("login"); // "login" | "signup" | "tracker"

  if (user && view !== "tracker") {
    setView("tracker");
  }

  const goToLogin = () => setView("login");
  const goToSignup = () => setView("signup");
  const goToTracker = () => setView("tracker");

  let content = null;

  if (!user) {
    if (view === "signup") {
      content = <Signup goToLogin={goToLogin} />;
    } else {
      content = <Login goToSignup={goToSignup} />;
    }
  } else {
    content = <Tracker />;
  }

  return (
    <div className="app">
      <Navbar
        currentView={view}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToTracker={goToTracker}
      />
      <main className="main-content">{content}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
