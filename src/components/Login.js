import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [cred, setCred] = useState({ Email: "", Password: "" })
    let navigate = useNavigate();

    const handleclick = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: cred.Email, Password: cred.Password }),
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.AuthT)
            props.showalert("Logged in Successfully ", "success")
            navigate("/");
        }
        else {
            props.showalert("invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleclick} >
                <div className="mb-3 my-5">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={cred.Email} onChange={onChange} id="Email" name="Email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="Password" className="form-control" value={cred.Password} onChange={onChange} name="Password" id="Password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
