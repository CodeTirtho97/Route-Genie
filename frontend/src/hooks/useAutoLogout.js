import { useEffect } from "react";

const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // ✅ 30 minutes in milliseconds

const useAutoLogout = (logout) => {
    useEffect(() => {
        let timeout;

        // ✅ Reset Timer on User Activity
        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                logout(); // ✅ Calls logout from AuthContext
                console.log("User auto-logged out due to inactivity.");
            }, AUTO_LOGOUT_TIME);
        };

        // ✅ Detect User Activity (Mouse & Keyboard)
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);

        // ✅ Start Timer Initially
        resetTimer();

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
        };
    }, [logout]);
};

export default useAutoLogout;
