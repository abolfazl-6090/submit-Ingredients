import React, { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

const AuthContextProvider = props => {

    const [isAuth, setAuth] = useState(false)
    const loginHandler = () => {
        setAuth(true);
    };

    return (
    <AuthContext.Provider value={{ login: loginHandler, isAuth: isAuth }}>
        {props.children}
    </AuthContext.Provider>
    )
};

export default AuthContextProvider;


