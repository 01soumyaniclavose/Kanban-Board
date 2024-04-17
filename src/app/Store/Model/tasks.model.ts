export interface Task {
    id: number,
    taskName: string,
    status: 'ToDo' | 'Implementing' | 'Done'
}

export interface TaskModel {
    list: Task[],
    taskObj: Task,
    errorMessage: string
}