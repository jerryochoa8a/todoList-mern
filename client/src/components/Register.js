import React, { useState } from 'react'
import { navigate, Link } from '@reach/router';


export default () => {
    const [fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");



    const [errors, setErrors] = useState([]); //errors


    const onSubmitHandler = e => {
        //     e.preventDefault();
        //     axios.post('http://localhost:8000/api/task/new', {
        //         title,
        //         category,
        //         due,
        //         priority,
        //     })
        //         .then(res=>{
        //             console.log(res); 
        //             navigate('/')
        //         })
        //         .catch(err=>{
        //             const errorResponse = err.response.data.errors; 
        //             const errorArr = []; 
        //             for (const key of Object.keys(errorResponse)) { 
        //                 errorArr.push(errorResponse[key].message)
        //             }
        //             setErrors(errorArr);
        //         })   
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                {errors.map((err, index) => {
                    return (
                        <p style={{ color: "red" }} key={index}>{err}</p>
                    )
                })}
                <p>
                    <label>Email</label><br />
                    <input type="text" onChange={(e) => setFname(e.target.value)} />
                </p>
                <p>
                    <label>Password</label><br />
                    <input type="text" onChange={(e) => setLname(e.target.value)} />
                </p>
                <p>
                    <label>Email</label><br />
                    <input type="text" onChange={(e) => setEmail(e.target.value)} />
                </p>
                <p>
                    <label>Password</label><br />
                    <input type="text" onChange={(e) => setPassword(e.target.value)} />
                </p>
                <p>
                    <label>Confirm Password</label><br />
                    <input type="text" onChange={(e) => setConPassword(e.target.value)} />
                </p>

                <input type="submit" value="Add task" />
            </form>

            <Link to={'/login'}>login</Link>
        </div>
    )
}