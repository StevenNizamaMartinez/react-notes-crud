import { useRef, useEffect, useState, useContext } from "react"
import { TaskContainer } from "../context/TaskContext"

const TaskForm = () => {

    const inputRef = useRef()
    const [taskText, setTaskText] = useState("")
    const { AddTask } = useContext(TaskContainer)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleInput = (e) => {
        const value = e.target.value
        setTaskText(value)

    }

    const handleClick = (e) => {
        if (taskText.length > 0) {
            AddTask(taskText)
            setTaskText("")
        }
    }

    return (
        <form
            onSubmit={e => e.preventDefault()}
            className="task--form"
        >
            <input type="text" value={taskText} placeholder="Write your Task!!!!" ref={inputRef} onChange={handleInput} />
            <button onClick={handleClick}>Add Task</button>
        </form>
    )
}

export default TaskForm