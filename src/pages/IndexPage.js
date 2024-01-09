import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function IndexPage() {

    //Setting up hook of empty array
    const [posts, setPosts] = useState([]);

    //UseEffect function to get the post request from API
    useEffect(() => {
        fetch('http://ec2-15-207-247-163.ap-south-1.compute.amazonaws.com:4000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])
    return (
        <>
            {/* If post length is greater than 0 then map it and call Post component */}
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    )
}