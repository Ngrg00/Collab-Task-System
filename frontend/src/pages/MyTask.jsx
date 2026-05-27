import { ChevronRight, ChevronDown, BookmarkAlt, Filter } from '@boxicons/react';
import Header from '../component/Header';
import '../styles/my-task.css';
import { useState } from 'react';

function Task() {
    const [active, setActive] = useState([]);

    return(
        <>
            <Header/>
            <div className="task-wrapper">
                <h5>Task</h5>
                <div className="task-header">
                    <input type="text" placeholder='Search for task' className='search-bar'/>
                    <div className="filter">
                        <Filter/>
                    </div>
                </div>

                <div className="task-container">
                    <div className="task-date" onClick={() => {
                        if(active.includes(1)) {
                            setActive(active.filter(t => t !== 1));
                        } else {
                            setActive([...active, 1]);
                        }
                    }}>
                        {active.includes(1) ? <ChevronDown/> : <ChevronRight/>}
                        <p>Due in 2 weeks</p>
                        
                    </div>
                    {active.includes(1) ? 
                        <div className="tasks">
                            <div className="t">
                                <div className="checkbox">
                                </div>
                                <div className='task-info'>
                                    <h6 style={{fontSize:"1.25em"}}>Send Quote</h6>
                                    <p style={{color:"grey"}}>Wednesday, June 3 at 11:00 AM</p>
                                    <p><strong>Bruce</strong></p>
                                </div>
                                <BookmarkAlt />
                            </div>

                            <div className="t">
                                <div className="checkbox">
                                </div>
                                <div className='task-info'>
                                    <h6 style={{fontSize:"1.25em"}}>Send Quote</h6>
                                    <p style={{color:"grey"}}>Wednesday, June 3 at 11:00 AM</p>
                                    <p><strong>Bruce</strong></p>
                                </div>
                                <BookmarkAlt />
                            </div>
                        </div> : <div></div>
                    }
                </div>

                 <div className="task-container">
                    <div className="task-date" onClick={() => {
                        if(active.includes(2)) {
                            setActive(active.filter(t => t !== 2));
                        } else {
                            setActive([...active, 2]);
                        }
                    }}>
                        {active.includes(2) ? <ChevronDown/> : <ChevronRight/>}
                        <p>Due in 2 weeks</p>
                        
                    </div>
                    {active.includes(2) ? 
                        <div className="tasks">
                            <div className="t">
                                <div className="checkbox">
                                </div>
                                <div className='task-info'>
                                    <h6 style={{fontSize:"1.25em"}}>Send Quote</h6>
                                    <p style={{color:"grey"}}>Wednesday, June 3 at 11:00 AM</p>
                                    <p><strong>Bruce</strong></p>
                                </div>
                                <BookmarkAlt />
                            </div>

                            <div className="t">
                                <div className="checkbox">
                                </div>
                                <div className='task-info'>
                                    <h6 style={{fontSize:"1.25em"}}>Send Quote</h6>
                                    <p style={{color:"grey"}}>Wednesday, June 3 at 11:00 AM</p>
                                    <p><strong>Bruce</strong></p>
                                </div>
                                <BookmarkAlt />
                            </div>
                        </div> : <div></div>
                    }
                </div>
            </div>
        </>
    ); 
}

export default Task;