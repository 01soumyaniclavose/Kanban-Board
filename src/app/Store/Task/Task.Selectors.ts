import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskModel } from "../Model/tasks.model";
const getTaskState = createFeatureSelector<TaskModel>('tasks');

export const getTaskList = createSelector(getTaskState, (state) =>{
    return state.list;
})

export const getTask = createSelector(getTaskState, (state) =>{
    return state.taskObj;
})