import { useContext, useEffect, useState } from "react"
import { TaskContainer } from "../context/TaskContext"

const TaskList = () => {

    const { state, deleteTask, editTask, saveTask, updateTask } = useContext(TaskContainer)
    const [task, setTask] = useState("")

    useEffect(() => {
        render
    }, [state])

    const handleDelete = (e) => {
        let deleteID = parseInt(e.target.id)
        deleteTask(deleteID)
    }

    const handleEdit = (e) => {
        const prevTask = e.target.parentElement.querySelector(".delete").value
        setTask(prevTask)
        let editId = parseInt(e.target.id)
        editTask(editId)
    }

    const editChange = (e) => {
        const taskText = e.target.value
        setTask(taskText)
    }

    const handleSave = (e) => {
        let editId = parseInt(e.target.id)
        saveTask(editId)
        if (task.length >= 1) {
            updateTask(task, editId)
            setTask("");
        }
    }


    const render = state.map((s, i) => {
        return (
            <div className="task--item" key={i}>
                <h2>Task N° {i + 1}</h2>
                {s.edit ? <input type="text" value={task} onChange={editChange} id={s.task} /> : <p>{s.task}</p>}
                <div className="task--buttons">
                    {s.edit && <button onClick={handleSave} id={s.id} className="save">Save</button>}
                    {!s.edit && <button onClick={handleEdit} id={s.id} className="edit">Edit</button>}
                    <button onClick={handleDelete} id={s.id} value={s.task} className="delete">Delete</button>
                </div>
            </div>
        )
    })

    return (
        <div className="task--container">
            {state.length === 0 ? <h2>No hay tareas disponibles</h2> : render}
        </div>
    )
}

export default TaskList