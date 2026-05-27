import { Filter, ChevronDown, ChevronRight, BookmarkAlt, Plus } from '@boxicons/react';
import '../styles/task.css';
import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_URL;

function Task(props) {
    const project = props.project;
    const token = props.token;

    const option = {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    const [active, setActive] = useState([]);
    const [subProjects, setSubProjects] = useState([]);
    const [showAddSubProject, setShowAddSubProject] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState({});
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDue, setTaskDue] = useState("");
    const [taskPriority, setTaskPriority] = useState("");

    useEffect(() => {
        getSubProject().then(sp => setSubProjects(sp));
    }, []);

    const getSubProject = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getSubProject/${project.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
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

    const addSubProject = async () => {
        try {
            const res = await fetch(`${BASE_URL}/addSubProject`, {
                method: "POST",
                headers: {
                     Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ projectId: project.id, title })
            });

            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message);
            }

            const updated = await getSubProject();
            setSubProjects(updated);
            setTitle("");

            alert(data.message);
            setShowAddSubProject(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getTasks = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/getTasks/${id}`, {
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

    const addTask = async (subProjectId) => {
        try {
            const res = await fetch(`${BASE_URL}/addTask`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({subProjectId, title: taskTitle, priority: taskPriority, due: taskDue })
            });

            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message);
            }
            
            const updated = await getTasks(subProjectId);
            setTasks(prev => (
                { ...prev, [subProjectId]: updated }
            ));
            setShowTask(false);
            setTaskTitle("");
            setTaskPriority("");
            setTaskDue("")
           

            alert(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-tasks">
            <h5>Tasks</h5>

            <div className="task-header">
                <input type="text" placeholder='Search for task' className='search-bar'/>
                <div className="filter">
                    <Filter/>
                </div>
                
                <button onClick={() => setShowAddSubProject(true)}>Add Sub-Project</button>
            </div>

            <div className="task-container">
                {subProjects.length > 0 ?
                    subProjects.map((p, i) => (
                        <div key={i}>
                            <div className="task-date" onClick={async () => {
                                if(active.includes(i)) {
                                    setActive(active.filter(t => t !== i));
                                } else {
                                    setActive([...active, i]);

                                    if(!tasks[p.id]) {
                                        const data = await getTasks(p.id);

                                        setTasks(prev => ({
                                            ...prev,
                                            [p.id]: data
                                        }));
                                    }
                                }
                            }}>
                                {active.includes(i) ? <ChevronDown/> : <ChevronRight/>}
                                <p>{p.title}</p>
                            </div>

                            {active.includes(i) ? 
                                (<div className='p-task-container'>
                                    <button className="add-task-btn" onClick={() => setShowTask(true)} title="Add Task"><Plus size='sm'/></button>
                                    <div className="tasks">
                                        {tasks[p.id]?.map((t, i) => (
                                            <div className="t" key={t.id}>
                                                <div className="checkbox"></div>

                                                <div className='task-info'>
                                                    <h6 style={{fontSize:"1.25em"}}>
                                                        {t.title}
                                                    </h6>

                                                    <p style={{color:"grey"}}>
                                                        {
                                                            new Date(t.due_in)
                                                                .toLocaleString("en-GB", option)
                                                        }
                                                    </p>
                                                </div>

                                                <BookmarkAlt />
                                            </div>
                                        ))}
                                    </div>

                                    {showTask && (
                                        <div className="add-task-wrapper" onClick={() => setShowTask(false)}>
                                            <div className="add-task-container" onClick={(e) => e.stopPropagation()}>
                                                <h5>Add Task</h5>
                                                <div className="add-task-info">
                                                    <p style={{marginRight: "4px"}}>Name: </p>
                                                    <input type="text" style={{flex: "1"}} onChange={e => setTaskTitle(e.target.value)}/>
                                                </div>

                                                <div className="add-task-info">
                                                    <p style={{marginRight: "4px"}}>Due: </p>
                                                    <input type="datetime-local" onChange={e => setTaskDue(e.target.value)}/>
                                                </div>

                                                <div className="add-task-info">
                                                    <p>Priority: </p>
                                                    <select onChange={e => setTaskPriority(e.target.value)}>
                                                        <option value="low">Select priority</option>
                                                        <option value="high">High</option>
                                                        <option value="mid">Medium</option>
                                                        <option value="low">Low</option>
                                                    </select>
                                                </div>

                                                <div className='btn'>
                                                    <button onClick={() => addTask(p.id)}>Add Task</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>)
                            : (<div></div>)}
                        </div>
                    ))
                : (
                    <div className='task-date'>No Sub-Project</div>
                )}

                {showAddSubProject && (
                    <div className="add-project-wrapper" onClick={() => setShowAddSubProject(false)}>
                        <div className="add-project-container" onClick={(e) => e.stopPropagation()}>
                            <h5>Add sub-project</h5>
                            <div className="add-name">
                                <p style={{marginRight: "4px"}}>Name: </p>
                                <input type="text" style={{flex: "1"}} onChange={e => setTitle(e.target.value)}/>
                            </div>

                            <div>
                                <button onClick={() => addSubProject()}>Add project</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ); 
}

export default Task;