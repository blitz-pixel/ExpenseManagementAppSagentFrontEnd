// import { createContext, useState, useEffect } from "react";
// import PropTypes from "prop-types"; // Import prop-types
//
// // Create the context
// const UserContext = createContext();
//
// const UserProvider = ({ children }) => {
//     const [userId, setUserId] = useState(null);
//
//     // Load userId from localStorage when the component mounts
//     useEffect(() => {
//         const storedUserId = localStorage.getItem("userId");
//         if (storedUserId) {
//             setUserId(storedUserId);
//         }
//     }, []);
//
//     const setUser = (id) => {
//         localStorage.setItem("userId", id);
//         setUserId(id);
//     };
//
//     return (
//         <UserContext.Provider value={{ userId, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };
//
// // ✅ Add prop validation
// UserProvider.propTypes = {
//     children: PropTypes.node.isRequired, // Ensure children are passed
// };
//
// export { UserContext, UserProvider };
