import React, { useEffect, useState } from 'react'
import { navigate, Link } from '@reach/router';
import axios from 'axios';
import styles from './back.module.css';


export default props => {
    const { id } = props;
    const [title, setTitle] = useState("");
    const [category, setCat] = useState("");
    const [due, setDue] = useState("");
    const [priority, setPriority] = useState("");


    useEffect(() => { //gets the task that we are updating
        axios.get('http://localhost:8000/api/task/' + id)
            .then(res => {
                setTitle(res.data.title);
                setCat(res.data.category);
                setDue(res.data.due);
                setPriority(res.data.priority);
            })
    }, [])


    const updateTask = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/tasks/' + id + "/update", {
            title,
            category,
            due,
            priority,
        })
            .then(res => {
                console.log(res);
                navigate("/")
            })
    }
    
    return (
        <div className={styles.background}>

            <h2> Update </h2>

            <Link to={'/'}>cancel</Link>

            <form onSubmit={updateTask}>
                <p>
                    <label>title</label><br />
                    <input type="text"
                        name="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }} />
                </p>
                <p>
                    <label>category</label><br />
                    <input type="text"
                        name="category"
                        value={category}
                        onChange={(e) => { setCat(e.target.value) }} />
                </p>
                <p>
                    <label>Due Date</label> <br />
                    <input type="date"
                        name="due"
                        value={due}
                        onChange={(e) => { setDue(e.target.value) }} />
                </p>
                <p>
                    <label>Skill 1:</label><br />
                    <input type="text"
                        name="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)} />
                </p>

                <input type="submit" value="Edit task" /> <br />
            </form>
        </div>
    )
}