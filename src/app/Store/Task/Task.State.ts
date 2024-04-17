import { TaskModel } from "../Model/tasks.model";

export const TaskState: TaskModel = {
    list: [],
    errorMessage: '',
    taskObj: {
        id:0,
        taskName: '',
        status: 'ToDo'
    }
}