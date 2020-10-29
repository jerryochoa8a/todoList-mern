import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import styles from './todoList.module.css';
import axios from 'axios';
import moment from 'moment';


const LowP = () => {

    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/tasks/low')
            .then(res=>{
                setTasks(res.data);
                setLoaded(true);
            });
    },[])

    const deleteTask = (taskID) => {
        axios.delete('http://localhost:8000/api/task/' + taskID + '/delete')
            .then(res => {
                console.log(res);
            })
        window.location.reload(true)
    }


    return (
        <div className={styles.background}>

            <h1>Low</h1>
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
                })}   
            </table>
        </div>
    )
}

export default LowP;