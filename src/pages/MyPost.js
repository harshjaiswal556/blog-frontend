import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Post from "../components/Post";
import { UserContext } from "../UserContext";

export default function MyPost() {

    const { id } = useParams();

    //Setting up hook of empty array
    const [posts, setPosts] = useState([]);
    const { userInfo } = useContext(UserContext)

    // console.log(posts[0].author._id);
    //UseEffect function to get the post request from API
    useEffect(() => {
        fetch('http://ec2-13-200-152-133.ap-south-1.compute.amazonaws.com:4000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])
    return (
        <>
            {/* If post length is greater than 0 then map it and call Post component */}
            {posts.length > 0 && posts.map(post => (
                // if(post.author._id===userInfo.if){
                post.author._id === userInfo.id ? <Post {...post} /> : null
                // }

            ))}
        </>
    )
}