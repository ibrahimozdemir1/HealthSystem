export const login = async (username, password) => {
    if (username === "health" && password === "password123") {
        const token = "FAKE_JWT_TOKEN";
        localStorage.setItem("token", token);
        return true;
    }
    return false;
};

export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};
