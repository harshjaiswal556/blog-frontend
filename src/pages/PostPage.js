import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { format } from "date-fns"
import { UserContext } from "../UserContext";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://ec2-13-200-152-133.ap-south-1.compute.amazonaws.com:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                console.log(userInfo)
                setPostInfo(postInfo);
            })
        })
    }, [])

    if (!postInfo) return '';

    return (
        <div className="post-page">
            <div className="image">
                <img src={`http://ec2-13-200-152-133.ap-south-1.compute.amazonaws.com:4000/${postInfo.cover}`} alt="Retry later" />
            </div>
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
            <div className="author">~ {postInfo.author.username}</div>
            <div className="edited">{postInfo.isEdited === true ? `Last Edited - ${format(new Date(postInfo.updatedAt), 'MMM d, yyyy HH:mm')}` : null}</div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    {/* <a className="edit-btn" href={`/edit/${postInfo._id}`}>Edit this post</a> */}
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}> Edit this post </Link>
                </div>
            )}
        </div>
    )
}