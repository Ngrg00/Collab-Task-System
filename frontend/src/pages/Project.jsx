import Header from "../component/Header";
import ProgessionBar from '../component/ProgressionBar';
import WebsiteIcon from '../assets/website-design.png'
import '../styles/project.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_URL;

function Project() {
    const token = sessionStorage.getItem('token');
    const nav = useNavigate();

    const [showAddProject, setShowAddProject] = useState("");
    const [name, setName] = useState("");
    const [due, setDue] = useState("");
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        getProjects()
            .then(p => {
                setProjects(p);
            });

    }, []);

    const addProject = async () => {
        try {
            if(!name || !due) {
                return alert("All fields are required");
            }

            const res = await fetch(`${BASE_URL}/createProject`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, due })
            });

            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message);
            }

            setShowAddProject(false);
            setName("");
            setDue("");

            const updated = await getProjects();
            setProjects(updated);

            alert(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const getProjects = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getProjects`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await res.json();
            if(!res.ok) {
                alert(data.message);
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <Header/>
            <div className="projects-wrapper">
                <div className="project-header">
                    <h5>Projects</h5>
                    <button onClick={() => setShowAddProject(true)}>Add project</button>
                </div>

                <div className="projects-container">
                    {projects.map((m, i) => (
                        <div className="project" key={i} onClick={() => nav(`/projectPage/${m.id}`)}>
                            <img src={WebsiteIcon} alt="" />
                            <div className="title">
                                <p>{m.title}</p>
                                <ProgessionBar value={m.complete} className="progressionBar"/>
                            </div>

                            <div className="status">
                                <p style={{fontSize:"2em"}}>{m.complete}</p>
                                <p style={{fontSize:"1em", color:"gray"}}>%</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {showAddProject && (
                    <div className="add-project-wrapper" onClick={() => setShowAddProject(false)}>
                        <div className="add-project-container" onClick={(e) => e.stopPropagation()}>
                            <h5>Add project</h5>
                            <div className="add-name">
                                <p style={{marginRight: "4px"}}>Name: </p>
                                <input type="text" style={{flex: "1"}} onChange={e => setName(e.target.value)}/>
                            </div>

                            <div className="add-due">
                                <p>Due in: </p>
                                <input type="datetime-local" onChange={e => setDue(e.target.value)}/>
                            </div>

                            <div>
                                <button onClick={() => addProject()}>Add project</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Project;