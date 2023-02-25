import { createContext, useReducer, useState, useEffect } from "react";
import { INITIAL_STATE, TaskReducer } from "./TaskReducer";

export const TaskContainer = createContext()

export const TaskContainerProvider = ({children}) => {
    
    const [id, setId] = useState([])
    const [state, dispatch] = useReducer(TaskReducer, INITIAL_STATE)

    useEffect(()=> {
        let localTask = JSON.parse(localStorage.getItem("task"))
        if (localTask) {
            localTask.map( l => dispatch({type:"ADD_TASK", payload:l}) )
        }
        let localId = JSON.parse(localStorage.getItem("id"))
        if (localId) {
            setId(localId)
        }
    },[])

    const AddTask = (task) => {
        let taskPayload = {id: id.length, task:task, edit: false, done: false}
        dispatch({type:"ADD_TASK", payload: taskPayload})
        let newState = [...state, taskPayload]
        localStorage.setItem("task", JSON.stringify(newState))
        setId( 
            prevId => 
            {let newID = [...prevId, {}]
            localStorage.setItem("id", JSON.stringify(newID))
            return newID
            }
             )
    }

    const deleteTask = (index) => {
        dispatch({type: "DELETE_TASK", payload: {index: index}})
        let stateFilter = state.filter( s => s.id !== index )
        localStorage.setItem("task", JSON.stringify(stateFilter))
    }

    const editTask = (index) => {
        dispatch({type: "EDIT_TASK", payload: {position: index}})
    }

    const saveTask = (index) => {
        dispatch({type: "SAVE_TASK", payload: {position2: index}})
    }

    const updateTask = (newTask, id) => {
        dispatch({type:"UPDATE_TASK", payload: {newTask: newTask, id: id}})
    }

    return (
        <TaskContainer.Provider value={{AddTask, state, deleteTask, editTask, saveTask, updateTask}}>
            {children}
        </TaskContainer.Provider>
    )
}