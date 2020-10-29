import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import styles from './todoList.module.css';
import axios from 'axios';
import moment from 'moment';


export default () => {

    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/tasks/done') 
            .then(res=>{
                setTasks(res.data);
                setLoaded(true);
            });
    },[])


    return (
        <div className={styles.background}>
            
            <h1>Done Tasks</h1>
            <table>
                <tr>
                    <th>Done</th>
                    <th>Task Title</th>
                    <th>Due Date</th>
                    <th>Priority Level</th>
                </tr>
                {tasks.map((task, idx) => {
                    var inputDate = task.due;
                    var outputDate = moment(inputDate).format("dddd, MMM DD");
                   if(task.priority=='High')
                    return (
                        <>
                        <tr key={idx}>
                            <td><input type={'checkbox'}/></td>
                            <td><Link to={"/tasks/" + task._id}>{task.title}</Link></td>
                            <td>{outputDate}</td>
                            <td className={styles.High}>{task.priority}</td>
                        </tr>
                        </>
                    )
                    if(task.priority=='Medium')
                    return (
                        <>
                        <tr key={idx}>
                            <td><input type={'checkbox'}/></td>
                            <td><Link to={"/tasks/" + task._id}>{task.title}</Link></td>
                            <td>{outputDate}</td>
                            <td className={styles.Medium}>{task.priority}</td>
                        </tr>
                        </>
                    )
                    if(task.priority=='Low')
                    return (
                        <>
                        <tr key={idx}>
                            <td><input type={'checkbox'}/></td>
                            <td><Link to={"/tasks/" + task._id}>{task.title}</Link></td>
                            <td>{outputDate}</td>
                            <td className={styles.Low}>{task.priority}</td>
                        </tr>
                        </>
                    )
                })}  
            </table>
        </div>
    )
}