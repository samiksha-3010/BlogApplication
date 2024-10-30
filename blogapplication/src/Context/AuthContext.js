// import { createContext, useEffect, useReducer } from "react";
// import { toast } from 'react-hot-toast'
// // import api from "../Component/Blogs/api.config/Index";
// import axios from "axios";
// export const AuthContext = createContext();

// const initialState = { user: null };

// const reducer= (state, action) =>{ 
//     switch (action.type) {
//         case "LOGIN":

//         return {
//             ...state,
//             user: action.payload,
//           };
         
//         case "LOGOUT":
//             localStorage.removeItem("token")
//             toast.success("Logout success.")
//             return {  ...state,user:null } 
//         default:
//             return state;
//     }  
// }


//   export const AuthProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     useEffect(() => {
//         async function getCurrentUserData() {
//             var token = JSON.parse(localStorage.getItem("token"));
//             if (token) {
//               try {
//                   const response = await axios.post("http://localhost:8000/get-current-User",{ token });
//                 // const response = await api.post("/get-currentUser", { token });
//                 if (response.data.success) {
//                     dispatch({
//                         type: "LOGIN",
//                         payload: response.data.user
//                     })
//                 } else {
//                     dispatch({
//                         type: "LOGOUT",
                        
//                     });
                
//               } 
//             }catch (error) {
//                 console.log(error)
                
//               }
//             }
//         }
//         getCurrentUserData();
//     }, [])

//     return (
//         <AuthContext.Provider value={{ state, dispatch }} >
//             {children}
//         </AuthContext.Provider>
//     )
// }
// export default AuthContext;



import React, { createContext, useEffect, useReducer } from "react";
import api from "../Component/Blogs/ApiConfig/Index";
export const MyContext = createContext();
const initialState = { currentuser: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentuser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentuser: null,
      };

    default:
      return state;
  }
};
const BlogContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);

  const login = (userData, token) => {
    localStorage.setItem("blogtoken", JSON.stringify(token));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem("blogtoken");
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const token = JSON.parse(localStorage.getItem("blogtoken"));
        if (token) {
          const response = await api.post("/currentuser", { token });
          if (response.data.success) {
            // console.log(response?.data?.currentuser, "currentuser");
            dispatch({
              type: "LOGIN",
              payload: response?.data?.currentuser,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentUser();
  }, []);

  return (
    <MyContext.Provider value={{ state, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export default BlogContext;