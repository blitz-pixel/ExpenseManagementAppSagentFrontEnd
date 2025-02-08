import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    // const [token,setToken] = useState("")

    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            await axios.post("http://localhost:8080/api/v1/Login", credentials)
                .then(response => {
                    if (response.status === 200) {
                        console.log("Login successful");
                        console.log(response);
                        setRedirect(true);
                        const token = response.headers.get("X-Account-ID");
                        console.log(token);
                        // console.log("Token get during login:"+ token);
                        // console.log(response)
                        if (token) {
                            localStorage.setItem("accountId", token);

                        } else {
                            console.warn("No token received");
                            // throw new error("");
                        }
                    }
                    // return response;
        }).catch((error) => {
                        if (error.status === 400){
                            setError("Invalid Credentials")
                        }
                        console.error("Login failed:", error);
                    // setError(error.response?.data || "Login failed");
                    // setError("Invalid email or password" + response.data);

                });

    }
    if (redirect) {
        return <Navigate to="/Account" state={{ email: credentials.email }} />;
    }
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                {error}
                <h2>Login</h2>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <div>
                <p>
                    Don&#39;t have an account?{" "}
                    <Link to="/Registration" style={{ marginLeft: "5px", textDecoration: "none" }}>
                        Register
                    </Link>
                </p>
                <Link to="/" style={{ marginLeft: "5px", textDecoration: "none" }}>
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
};

export default Login;




// // console.log(response.data);
// console.log("Token:", response.data);
// if (response.status === 200){
//     console.log("Login successful");
//     setRedirect(true)
//     localStorage.setItem("token", response.data);
//     // localStorage.setItem("name", credentials.email);
//
// }
// console.log(response.data);
// console.log(response)
// alert("Logine successfully");