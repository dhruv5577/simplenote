import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [cred, setCred] = useState({ Name: "", Email: "", Password: "", cPassword: "" })
    let navigate = useNavigate();

    const handleclick = async (e) => {
        e.preventDefault();
        const { Name, Email, Password } = cred;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Name, Email, Password }),
        });

        const json = await response.json();
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.AuthT)
            navigate("/")
            props.showalert("Account Successfully Created", "success")
        }
        else {
            props.showalert("invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-5 '>
            <form onSubmit={handleclick}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name" onChange={onChange} name="Name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" onChange={onChange} name="Email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="Password" id="Password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="cPassword" id="cPassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
