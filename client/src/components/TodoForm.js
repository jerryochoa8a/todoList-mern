import React, { useState } from 'react'
import axios from 'axios';
import styles from './todoList.module.css';
import { navigate, Link } from '@reach/router';
import moment from 'moment';


export default () => {
    const [title, setTitle] = useState("");
    const [category, setCat] = useState("Work");
    const [due, setDue] = useState();
    const [priority, setPriority] = useState("Low");

    const [errors, setErrors] = useState([]); //errors


    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/task/new', {
            title,
            category,
            due,
            priority,
        })
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    var today = moment().format("dddd, MMM DD")

    return (
        <div className={styles.background}>

            <h1>Make a Task</h1>

            <form onSubmit={onSubmitHandler}>
                {errors.map((err, index) => {
                    return (
                        <p style={{ color: "red" }} key={index}>{err}</p>
                    )
                })}
                <p>
                    <label>Task Title</label><br />
                    <input type="text" onChange={(e) => setTitle(e.target.value)} />
                </p>
                <p>
                    <label>category</label><br />
                    <select onChange={(e) => setCat(e.target.value)}>
                        <option value="Work">Work</option>
                        <option value="Home">Home</option>
                        <option value="Finance">Finance</option>
                    </select>
                </p>
                <p>
                    <label>due date</label><br />
                    <input type="date" min={today} onChange={(e) => setDue(e.target.value)} />
                </p>
                <p>
                    <label>Priority</label><br />
                    <select onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    {/* <input type="text" onChange={(e) => setPriority(e.target.value)} /> */}
                </p>

                <input type="submit" value="Add task" />
            </form>
        </div>
    )
}