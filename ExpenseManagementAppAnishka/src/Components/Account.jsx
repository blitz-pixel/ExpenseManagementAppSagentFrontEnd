import {Navigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"

function Account () {
    const location = useLocation();
    const data = location.state || {};
    // console.log(data.email);
    const key = localStorage.getItem("token");
    console.log(key);
    const [account, setAccount] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/account",{
                    headers: {
                        "Authorization": `Bearer ${key}`
                    }
                });
                console.log(response);
            } catch (error) {
                console.error("There was an error fetching the data:", error);
            }
        };

        fetchData();
    }, []);

    if (key === "undefined") {
        return <Navigate to="/Login"/>;
    }


    // } else {
    //     return
    // }

    return (
        <div>
            <h1>Welcome {data.email}</h1>
        </div>
    );
}

export default Account;