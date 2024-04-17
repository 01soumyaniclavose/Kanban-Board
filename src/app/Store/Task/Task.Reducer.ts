import { createReducer, on } from "@ngrx/store";
import { TaskState } from "./Task.State";
import { addTaskSuccess, deleteTaskSuccess, getTaskSuccess, loadTaskFail, loadTaskSuccess, updateTaskSuccess } from "./Task.Action";

const _TaskReducer = createReducer(TaskState,
    on(loadTaskSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),
    on(loadTaskFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errormessage

        }
    }),
    on(getTaskSuccess, (state, action) => {
        return {
            ...state,
            taskObj: action.obj,
            errorMessage: ''
        }
    }),
    on(addTaskSuccess, (state, action) => {
        const _newdata = { ...action.inputdata };
        return {
            ...state,
            list: [...state.list, _newdata],
            errorMessage: ''
        }
    }),
    on(updateTaskSuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        });
        return {
            ...state,
            list: _newdata,
            errorMessage: ''
        }
    }),
    on(deleteTaskSuccess, (state, action) => {
        const _newdata = state.list.filter(o => o.id != action.taskid);
        return {
            ...state,
            list: _newdata,
            errorMessage: ''
        }
    })
)

export function TaskReducer(state: any, action: any) {
    return _TaskReducer(state, action);
}