import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from '../components/Editor';

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

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createPost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        data.set('isEdited', false);
        e.preventDefault();
        // console.log(files);
        const response = await fetch('http://ec2-13-200-152-133.ap-south-1.compute.amazonaws.com:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        })
        if (response.ok) {
            setRedirect(true);
        } else {
            alert('Please fill all the fields.')
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <form onSubmit={createPost}>
            <input type="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="summary" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} />
            <input type="file" onChange={e => setFiles(e.target.files)} />
            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: 10 }}>Create Post</button>
        </form>
    )
}