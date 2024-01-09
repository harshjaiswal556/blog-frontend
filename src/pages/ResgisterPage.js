import { useState } from "react"

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    async function register(e) {
        e.preventDefault();
        const response = await fetch('http://ec2-15-207-247-163.ap-south-1.compute.amazonaws.com:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password, email }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status !== 200) {
            alert('Already have an account with this username');
        } else {
            alert('Successfully registered')
        }
    }
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>Register</button>
        </form>
    )
}