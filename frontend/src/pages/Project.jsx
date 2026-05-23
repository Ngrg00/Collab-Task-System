import Header from "../component/Header";
import ProgessionBar from '../component/ProgressionBar';
import WebsiteIcon from '../assets/website-design.png'
import '../styles/project.css';
import { useState } from 'react';

function Project() {
    const [showTask, setShowTask] = useState([]);

    return(
        <>
            <Header/>
            <div className="projects-wrapper">
                <div className="project-header">
                    <h5>Projects</h5>
                    <button>Add project</button>
                </div>
                <div className="projects-container">
                    <div className="project">
                        <img src={WebsiteIcon} alt="" />
                        <div className="title">
                            <p>Create a collaboration task system</p>
                            <ProgessionBar value={30} className="progressionBar"/>
                        </div>
                        <div className="status">
                            <p style={{fontSize:"2em"}}>30</p>
                            <p style={{fontSize:"1em", color:"gray"}}>%</p>
                        </div>
                    </div>

                    <div className="project">
                        <img src={WebsiteIcon} alt="" />
                        <div className="title">
                            <p>Create a collaboration task system</p>
                            <ProgessionBar value={30} className="progressionBar"/>
                        </div>
                        <div className="status">
                            <p style={{fontSize:"2em"}}>30</p>
                            <p style={{fontSize:"1em", color:"gray"}}>%</p>
                        </div>
                    </div>

                    <div className="project">
                        <img src={WebsiteIcon} alt="" />
                        <div className="title">
                            <p>Create a collaboration task system</p>
                            <ProgessionBar value={30} className="progressionBar"/>
                        </div>
                        <div className="status">
                            <p style={{fontSize:"2em"}}>30</p>
                            <p style={{fontSize:"1em", color:"gray"}}>%</p>
                        </div>
                    </div>

                    <div className="project">
                        <img src={WebsiteIcon} alt="" />
                        <div className="title">
                            <p>Create a collaboration task system</p>
                            <ProgessionBar value={30} className="progressionBar"/>
                        </div>
                        <div className="status">
                            <p style={{fontSize:"2em"}}>30</p>
                            <p style={{fontSize:"1em", color:"gray"}}>%</p>
                        </div>
                    </div>

                    <div className="project">
                        <img src={WebsiteIcon} alt="" />
                        <div className="title">
                            <p>Create a collaboration task system</p>
                            <ProgessionBar value={30} className="progressionBar"/>
                        </div>
                        <div className="status">
                            <p style={{fontSize:"2em"}}>30</p>
                            <p style={{fontSize:"1em", color:"gray"}}>%</p>
                        </div>
                    </div>

                    <div className="project">
                        <img src={WebsiteIcon} alt="" />
                        <div className="title">
                            <p>Create a collaboration task system</p>
                            <ProgessionBar value={30} className="progressionBar"/>
                        </div>
                        <div className="status">
                            <p style={{fontSize:"2em"}}>30</p>
                            <p style={{fontSize:"1em", color:"gray"}}>%</p>
                        </div>
                    </div>
                </div>
                

            </div>
        </>
    );
}

export default Project;