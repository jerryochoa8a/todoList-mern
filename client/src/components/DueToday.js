import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import styles from './todoList.module.css';
import axios from 'axios';
import moment from 'moment';


export default () => {

    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/tasks')
            .then(res => {
                setTasks(res.data);
                setLoaded(true);
            });
    }, [])

    const deleteTask = (taskID) => {
        axios.delete('http://localhost:8000/api/task/' + taskID + '/delete')
            .then(res => {
                console.log(res);
            })
        window.location.reload(true)
    }

    var today = moment().format("dddd, MMM DD")


    return (
        <div className={styles.background}>


            <h1>Due Today</h1>
            {today}
            <table>
                <tr>
                    <th>Task Title</th>
                    <th>Due Date</th>
                    <th>Priority Level</th>
                    <th></th>
                </tr>
                {tasks.map((task, idx) => {
                    var inputDate = task.due;
                    var outputDate = moment(inputDate).format("dddd, MMM DD");
                    var today = moment().format("dddd, MMM DD")
                    if (outputDate == today) {
                        if (task.priority == 'High')
                            return (
                                <>
                                    <tr key={idx}>
                                        <td><Link to={"/tasks/" + task._id}>{task.title}</Link></td>
                                        <td>{outputDate}</td>
                                        <td className={styles.High}>{task.priority}</td>
                                        <td><button onClick={(e) => { deleteTask(task._id) }}>Complete</button></td>
                                    </tr>
                                </>
                            )
                        if (task.priority == 'Medium')
                            return (
                                <>
                                    <tr key={idx}>
                                        <td><Link to={"/tasks/" + task._id}>{task.title}</Link></td>
                                        <td>{outputDate}</td>
                                        <td className={styles.Medium}>{task.priority}</td>
                                        <td><button onClick={(e) => { deleteTask(task._id) }}>Complete</button></td>
                                    </tr>
                                </>
                            )
                        if (task.priority == 'Low')
                            return (
                                <>
                                    <tr key={idx}>
                                        <td><Link to={"/tasks/" + task._id}>{task.title}</Link></td>
                                        <td>{outputDate}</td>
                                        <td className={styles.Low}>{task.priority}</td>
                                        <td><button onClick={(e) => { deleteTask(task._id) }}>Complete</button></td>
                                    </tr>
                                </>
                            )
                    }
                    // return (
                    //     <>
                    //     <tr key={idx}>
                    //         <td><Link to={"/tasks/" + task._id}>{task.title}</Link></td>
                    //         <td>{outputDate}</td>
                    //         <td className={styles.High}>{task.priority}</td>
                    //     </tr>
                    //     </>
                    // )
                })}
            </table>
        </div>
    )
}