import { useContext } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();


    //UseEffect to call backend API to check whether the user is logged in
    useEffect(() => {
        fetch("http://ec2-15-207-247-163.ap-south-1.compute.amazonaws.com:4000/profile", {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [])

    //Logout function to post a request to log the user out
    function logout() {
        fetch("http://ec2-15-207-247-163.ap-south-1.compute.amazonaws.com:4000/logout", {
            credentials: 'include',
            method: 'POST',
        })
        setUserInfo(null); //If user is logged out then set user info to null
        navigate('/');
        // window.location.reload();
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