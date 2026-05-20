import Header from "../component/Header";
import ProgressBar from "../component/ProgressionBar";
import Chart from "../component/Chart";
import { 
    Task, LoaderLinesAlt, Check, 
    DotsHorizontalRounded, MessageCircleDots, 
    CalendarAlt, Plus } from "@boxicons/react";
import '../styles/home.css';
import { useState } from "react";

function Home() {
    return(
        <>
            <Header/>
            <div className="home-wrapper">
                <p className="greetings">Hello Jones,</p>
                <p className="date">{
                    new Date().toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })}
                </p>

                <div className="overview">
                    <div className="task-activity">
                        <div className="task-overview">
                            <div className="task">
                                <div className="task-icon">
                                    <Task fill="#1ebd59" />
                                </div>
                                <div className="task-info">
                                    <p>Total Task</p>
                                    <h5>18</h5>  
                                </div>
                            </div>

                            <div className="task">
                                <div className="task-icon">
                                    <LoaderLinesAlt fill="#1ebd59" />
                                </div>
                                <div className="task-info">
                                    <p>In progress</p>
                                    <h5>4</h5>  
                                </div>
                            </div>

                            <div className="task">
                                <div className="task-icon">
                                    <DotsHorizontalRounded fill="#1ebd59" />
                                </div>
                                <div className="task-info">
                                    <p>Pending</p>
                                    <h5>8</h5>  
                                </div>
                            </div>

                            <div className="task">
                                <div className="task-icon">
                                    <Check fill="#1ebd59" />
                                </div>
                                <div className="task-info">
                                    <p>Completed</p>
                                    <h5>6</h5>  
                                </div>
                            </div>
                        </div>

                        <div className="urgent-task">
                            <h5>
                                Important Task
                            </h5>

                            <div className="task-container">
                                <div className="task">
                                    <div className="prority-high">
                                        <span></span>
                                        High
                                    </div>
                                    <div className="task-details">
                                        <h6>Collab Task System</h6>
                                        <p>Make a website that is task management with collaberation with other people.</p>
                                        <ProgressBar value={20}/>
                                        <div className="task-bottom">
                                             <div className="avatar-stack">
                                                <div className="avatar">A</div>
                                                <div className="avatar">B</div>
                                                <div className="avatar">+3</div>
                                            </div>

                                            <div className="messages">
                                                <MessageCircleDots fill="#b8b8b8" />
                                                <p>2</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="task">
                                     <div className="prority-mid">
                                         <span></span>
                                        Mid
                                    </div>
                                </div>
                                <div className="task">
                                     <div className="prority-low">
                                         <span></span>
                                        Low
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="activity-wrapper">
                            <h5>Activity</h5>
                            <div className="activity-container">
                                <div className="activity">
                                    <div className="avatar">A</div>
                                    <div>
                                        <p>Alice Completed the UI design task</p>
                                        <p><small style={{color:"grey"}}>2 mins ago</small></p>
                                    </div>
                                </div>

                                <div className="activity">
                                    <div className="avatar">A</div>
                                    <div>
                                        <p>Alice Completed the UI design task</p>
                                        <p><small style={{color:"grey"}}>2 mins ago</small></p>
                                    </div>
                                </div>

                                <div className="activity">
                                    <div className="avatar">A</div>
                                    <div>
                                        <p>Alice Completed the UI design task</p>
                                        <p><small style={{color:"grey"}}>2 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="schedule-projects">
                        <div className="schedule-wrapper">
                            <div className="title-calendar">
                                <h5>Schedule</h5>
                                <div className="left">
                                    <div>
                                        <CalendarAlt/>
                                    </div>
                                    <div>
                                        <Plus/>
                                    </div>
                                </div>
                            </div>
                            <div className="schedule-container">
                                <div className="schedule">
                                    <div className="top">
                                        <h6>Project meeting</h6>
                                        <div className="date">
                                            <p>21 May 2026</p>
                                            <p>10:00 - 11:30</p>
                                        </div>
                                    </div>
                                    <p className="type">Zoom meeting</p>
                                    <div className="bottom">
                                        <div className="avatar-stack">
                                            <div className="avatar">A</div>
                                            <div className="avatar">B</div>
                                            <div className="avatar">+3</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="schedule">
                                    <div className="top">
                                        <h6>Project meeting</h6>
                                        <div className="date">
                                            <p>21 May 2026</p>
                                            <p>10:00 - 11:30</p>
                                        </div>
                                    </div>
                                    <p className="type">Zoom meeting</p>
                                    <div className="bottom">
                                        <div className="avatar-stack">
                                            <div className="avatar">A</div>
                                            <div className="avatar">B</div>
                                            <div className="avatar">+3</div>
                                        </div>
                                    </div>
                               </div>
                            
                               <div className="schedule">
                                    <div className="top">
                                        <h6>Project meeting</h6>
                                        <div className="date">
                                            <p>21 May 2026</p>
                                            <p>10:00 - 11:30</p>
                                        </div>
                                    </div>
                                    <p className="type">Zoom meeting</p>
                                    <div className="bottom">
                                        <div className="avatar-stack">
                                            <div className="avatar">A</div>
                                            <div className="avatar">B</div>
                                            <div className="avatar">+3</div>
                                        </div>
                                    </div>
                               </div>

                            </div>
                        </div>

                        <div className="project-wrapper">
                            <h5>Projects</h5>
                            <div className="project-container">
                                <div className="chart">
                                    <Chart labels={[""]} values={[4]} color={["green"]}/> 
                                    <div>
                                        <p style={{fontSize:"0.8em"}}>Total Project</p>
                                        <p style={{fontSize:"1.5em", marginTop:"10px"}}> <strong>04</strong></p>
                                    </div>
                                </div>
                                <div className="chart">
                                    <Chart labels={[""]} values={[3, 1]} color={["orange", "grey"]}/> 
                                     <div>
                                        <p style={{fontSize:"0.8em"}}>In progress</p>
                                        <p style={{fontSize:"1.5em", marginTop:"10px"}}> <strong>03</strong></p>
                                    </div>
                                </div>
                                <div className="chart">
                                    <Chart labels={[""]} values={[1, 3]} color={["red", "grey"]}/> 
                                     <div>
                                        <p style={{fontSize:"0.8em"}}>At risk</p>
                                        <p style={{fontSize:"1.5em", marginTop:"10px"}}> <strong>01</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;