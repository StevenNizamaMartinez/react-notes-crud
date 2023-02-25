export const INITIAL_STATE = []

export const TaskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return (
                [...state, {id: action.payload.id,task: action.payload.task, edit: false, done: false}]
            )
        case "DELETE_TASK":
            let deleteIndex = parseInt(action.payload.index)
            let stateFilter = state.filter( s => s.id !== deleteIndex)
            return (stateFilter)
        case "EDIT_TASK":
            let positionIndex = parseInt(action.payload.position)
            let editIndex = state.findIndex( s => s.id == positionIndex)
            let updatedState = [...state]; // Copia el array actual
            updatedState[editIndex] = { ...state[editIndex], edit: true }; // Actualiza el objeto que se va a editar
            return updatedState;
        case "SAVE_TASK":
            let positionIndex2 = parseInt(action.payload.position2)
            let editIndex2 = state.findIndex( s => s.id == positionIndex2)
            let updatedState2 = [...state]; // Copia el array actual
            updatedState2[editIndex2] = { ...state[editIndex2], edit: false }; // Actualiza el objeto que se va a editar
            return updatedState2;

        case "UPDATE_TASK":
            let updateTask = action.payload.newTask
            let updatePosition = action.payload.id
            let editIndex3 = state.findIndex( s => s.id == updatePosition)
            let updateState3 = [...state]
            updateState3[editIndex3] = {...state[editIndex3], task: updateTask}  
            localStorage.setItem("task", JSON.stringify(updateState3))
            return updateState3;
        default:
            state
    }
}