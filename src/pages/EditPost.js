import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState('');
    const [isEdited, setIsEdited] = useState(true);
    // const [cover, setCover] = useState('');
    useEffect(() => {
        fetch("http://localhost:4000/post/" + id).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
                setFiles(postInfo.cover);
                console.log(postInfo.cover)
            })
        })
    }, [])

    async function updatePost(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        data.set('file', files[0]);
        data.set('isEdited', true);
        console.log("response");
        // console.log(files);
        // console.log(files?.[0]);
        // if (files?.[0]) {
        // }
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        console.log(response.ok);
        console.log("response");
        if (response.ok) {
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={"/post/" + id} />
    }

    // const modules = {
    //     toolbar: [
    //         [{ 'header': [1, 2, false] }],
    //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    //         ['link', 'image'],
    //         ['clean']
    //     ],
    // }
    // const formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'link', 'image'
    // ]

    return (
        <form onSubmit={updatePost}>
            <input type="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="summary" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} />
            <input type="file" onChange={e => setFiles(e.target.files)} />
            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: 10 }}>Update Post</button>
        </form>
    )
}