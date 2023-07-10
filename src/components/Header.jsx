import { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    //UseEffect to call backend API to check whether the user is logged in
    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [])

    //Logout function to post a request to log the user out
    function logout() {
        fetch("http://localhost:4000/logout", {
            credentials: 'include',
            method: 'POST',
        })
        setUserInfo(null); //If user is logged out then set user info to null
    }

    //Username to check if user is not logged in then it will be null value
    const username = userInfo?.username;

    return (
        <header>
            {/* Logo is linked to home page */}
            <Link to={'/'} className="logo">MyBlog</Link>

            <nav>
                {/* If user name is not null  */}
                {username && (<>
                    <Link to="/mypost">My Post</Link>
                    <Link to="/create">Create New Post</Link>
                    <a onClick={logout}>Logout</a>
                </>)}

                {/* If user name is null  */}
                {!username && (<>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>)}
            </nav>
        </header>
    )
}