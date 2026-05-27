import { useEffect, useState } from "react";
import Header from "../component/Header";
import WebsiteIcon from '../assets/website-design.png';
import '../styles/project-page.css';
import { useParams } from "react-router-dom";
import {DotsHorizontalRounded} from '@boxicons/react';
import Info from "./Info";
import Task from "./Task";

const BASE_URL = import.meta.env.VITE_URL;

function ProjectPage () {
    const token = sessionStorage.getItem('token');
    const { id } = useParams();

    const [project, setProject] = useState({});
    const [projectCreator, setProjectCreator] = useState("");
    const [active, setActive] = useState(1);

    useEffect(() => {
        if(!id) return;

        getProject().then(p => setProject(p));

        getProjectCreator().then(u => setProjectCreator(u));
    }, []);

    const getProject = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getProject/${id}`, {
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
            console.log(error);
        }
    }

    const getProjectCreator = async () => {
        try {
            const res = await fetch(`${BASE_URL}/projectCreator/${id}`, {
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
        <> 
            <Header/>
            <div className="project-page-wrapper">
                <div className="p-header">
                    <div className="p-left">
                        <img src={WebsiteIcon} alt="" />
                    </div>
                    <div className="p-middle">
                        <h5>{project.title}</h5>
                        <p style={{color:"grey"}}>Created by: <strong>{projectCreator.first_name + " " + projectCreator.last_name}</strong></p>
                        <div className="p-nav">
                            <div 
                                onClick={() => setActive(1)}
                                className={active === 1 ? "active" : ""}
                            >
                                <p>Info</p>
                            </div>

                            <div 
                                onClick={() => setActive(2)}
                                className={active === 2 ? "active" : ""}
                            >
                                <p>Tasks</p>
                            </div>

                            <div 
                                onClick={() => setActive(3)}
                                className={active === 3 ? "active" : ""}
                            >
                                <p>Teams</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-right">
                        <button><DotsHorizontalRounded/></button>
                    </div>
                </div>

                <div className="p-container">
                    {active === 1 ? (
                        <Info project={project} creator={projectCreator}/>
                    ) : active === 2 ? (
                        <div>
                            <Task project={project} token={token}/>
                        </div>
                    ) : active === 3 ? (
                        <div>
                            team
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProjectPage;