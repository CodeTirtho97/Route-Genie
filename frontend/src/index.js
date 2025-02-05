import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);