import { useEffect, useState } from 'react';
import '../styles/task_info.css';

const BASE_URL = import.meta.env.VITE_URL;

function Task_Info(props) {
    const id = props.id;
    const close = props.close;
    const token = props.token

    const [task, setTask] = useState([]);

    const option = {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    useEffect(() => {
        getTask().then(t => setTask(t));
    }, [])
    const getTask = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getTask/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="task-info-wrapper" onClick={close}>
            {console.log(task)}
            <div className="task-info-container">
                <div className="task-info-header">
                    <h5>{task.title}</h5>
                    <p style={{color:"grey"}}>Created by: <strong>{task.first_name + " " + task.last_name}</strong></p>
                </div>

                <div className="task-info">
                    <div className="rows">
                        <p className='labels'>Description: </p>
                        {task.description !== null ? (
                            <p>{task.description}</p>
                        ) : (
                            <textarea placeholder='Add description...'></textarea>
                        )}
                    </div>
                </div>
                
                <div className="task-info">
                    <div className="rows">
                        <p className='labels'>Priority: </p>
                        <p>{task.priority}</p>
                    </div>

                    <div className="rows">
                        <p className='labels'>Project: </p>
                        <p>{task.project_title}</p>
                    </div>

                    <div className="rows">
                        <p className='labels'>Sub-Project: </p>
                        <p>{task.sub_project_title}</p>
                    </div>

                    <div className="rows">
                        <p className='labels'>Due: </p>
                        <p>{new Date(task.due_in).toLocaleString('en-GB', option)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task_Info;