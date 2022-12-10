import {Navigate, Outlet} from "react-router-dom";

export function AuthHOC(props) {
    const token = localStorage.getItem("token")

    if (token) {
        return (
            <Outlet/>
        )
    } else {
        return (
            <Navigate to={"/input"}/>
        )
    }
}