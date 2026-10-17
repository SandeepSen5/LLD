import React from "react";
import { Navigate } from "react-router-dom";

function withAuth(Component) {
  return function ProtectedComponent(props) {
    const isAuthenticated = true;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
}

function Dashboard({ name }) {
  return <h1>Welcome, {name}</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);

function App() {
  return (
    <div>
      <ProtectedDashboard name="Sandeep" />
    </div>
  );
}

export default App;