import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9092/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});


const logout = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("tokenExpiry");
    window.location.href = "/";
};

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accountId");
        const tokenExpiry = Number(localStorage.getItem("tokenExpiry"));

        if (token && tokenExpiry) {
            if (Date.now() > tokenExpiry) {
                logout();
                return Promise.reject(new Error("Session expired. Please log in again."));
            }
            if (config.method === "post") {
                config.data = { ...config.data, accountId : token };
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);


const saveAuthToken = (token) => {
    if (!token) return
    const expiresIn = 60 * 60 * 24 * 1000 ; // 24 hours
    const expiryTime = Date.now() + expiresIn;
    localStorage.setItem("accountId", token);
    localStorage.setItem("tokenExpiry", expiryTime.toString());


    logoutAfterTime(expiresIn);
};


const logoutAfterTime = (timeInMs) => {
    if (timeInMs <= 0 || isNaN(timeInMs)) return;
    setTimeout(() => logout(), timeInMs);
};


const tokenExpiry = Number(localStorage.getItem("tokenExpiry"));
if (tokenExpiry && tokenExpiry > Date.now()) {
    logoutAfterTime(tokenExpiry - Date.now());
} else if (tokenExpiry){
    logout();
}


export { api, saveAuthToken, logout };
