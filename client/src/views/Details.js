import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import styles from './back.module.css';
import moment from 'moment';



export default props => {
    const [task, setTasks] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/task/" + props.id)
            .then(res => setTasks(res.data))
    }, [])


    // const deleteTask = (taskID) => {
    //     axios.delete('http://localhost:8000/api/task/' + taskID + '/delete')
    //         .then(res => {
    //             console.log(res);
    //             navigate('/')
    //         })
    // }

    const editTask = (taskID) => {
        navigate("/tasks/" + task._id + "/edit")
    }

    var inputDate = task.due;
    var outputDate = moment(inputDate).format("dddd, MMM DD");

    return (
        <div className={styles.background}>

            <h2>Details about: {task.title} Task</h2>

            {/* <button onClick={(e) => { deleteTask(task._id) }}> Completed </button> */}
            <button onClick={(e) => { editTask(task._id) }}> edit </button>

            <p><b>due date:</b> {outputDate}</p>
            <p><b>priority:</b> {task.priority}</p>
            <p><b>category</b> {task.category}</p>

        </div>
    )
}