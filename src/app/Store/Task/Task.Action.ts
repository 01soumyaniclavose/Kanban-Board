// This class will declares all actions
import { createAction, props } from "@ngrx/store"
import { Task } from "../Model/tasks.model";

export const LOAD_TASK= '[task page]load task'
export const LOAD_TASK_SUCCESS= '[task page]load task success'
export const LOAD_TASK_FAIL= '[task page]load task fail'
export const ADD_TASK= '[task page]add task'
export const ADD_TASK_SUCCESS= '[task page]add task success'
export const GET_TASK= '[task page]get task'
export const GET_TASK_SUCCESS= '[task page]get task success'
export const UPDATE_TASK= '[task page]update task'
export const UPDATE_TASK_SUCCESS= '[task page]update task success'
export const DELETE_TASK= '[task page]delete task'
export const DELETE_TASK_SUCCESS= '[task page]delete task success'


export const loadTask= createAction(LOAD_TASK);
export const loadTaskSuccess= createAction(LOAD_TASK_SUCCESS, props<{list:Task[]}>());
export const loadTaskFail= createAction(LOAD_TASK_FAIL,props<{errormessage:string}>());

export const addTask= createAction(ADD_TASK, props<{inputdata: Task}>());
export const addTaskSuccess= createAction(ADD_TASK_SUCCESS, props<{inputdata:Task}>());

export const updateTask= createAction(UPDATE_TASK, props<{inputdata: Task}>());
export const updateTaskSuccess= createAction(UPDATE_TASK_SUCCESS, props<{inputdata:Task}>());

export const deleteTask= createAction(DELETE_TASK, props<{taskid: number}>());
export const deleteTaskSuccess= createAction(DELETE_TASK_SUCCESS, props<{taskid:number}>());

export const getTask= createAction(GET_TASK, props<{id: number}>());
export const getTaskSuccess= createAction(GET_TASK_SUCCESS, props<{obj: Task}>());
