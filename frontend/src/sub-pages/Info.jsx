import '../styles/info.css'

function Info(props) {
    const project = props.project;
    const creator = props.creator;

    const option = {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    return (
        <div className="p-info">
            <div className="p-info-container">
                <div className="rows">
                    <p className='label'>Description: </p>
                    {project.description !== null ? (
                        <p>{project.description}</p>
                    ) : (
                        <textarea placeholder='Add description...'></textarea>
                    )}
                </div>
            </div>

            <div className="p-info-container">
                <div className="rows">
                    <p className='label'>Priority: </p>
                    <p>High</p>
                </div>

                <div className="rows">
                    <p className='label'>Created by: </p>
                    <p>{creator.first_name + " " + creator.last_name}</p>
                </div>

                <div className="rows">
                    <p className='label'>Sub-projects: </p>
                    <p>4</p>
                </div>

                 <div className="rows">
                    <p className='label'>Tasks: </p>
                    <p>10</p>
                </div>
            </div>

            <div className="p-info-container">
                <div className="rows">
                    <p className='label'>Complete: </p>
                    <p>{project.complete} <small>%</small></p>
                </div>

                <div className="rows">
                    <p className='label'>Due date: </p>
                    <p>{new Date(project.due_in).toLocaleString("en-GB", option)}</p>
                </div>
            </div>

            <div className="p-info-container">
                <div className="rows">
                    <p className='label'>Client: </p>
                    <p></p>
                </div>

                 <div className="rows">
                    <p className='label'>Contact: </p>
                    <p></p>
                </div>
            </div>
        </div>
    ); 
}

export default Info; 