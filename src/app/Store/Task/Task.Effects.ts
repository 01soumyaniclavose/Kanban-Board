//This class wil declare all effects, here handiling all API

import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DataService } from "src/app/service/data.service";
import {
    addTask, addTaskSuccess, deleteTask, deleteTaskSuccess, loadTask,
    loadTaskFail, loadTaskSuccess, updateTask, updateTaskSuccess
} from "./Task.Action";
import { of } from "rxjs";
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators'
import { showalert } from "../Common/App.Action";

@Injectable()
export class TaskEffects {

    constructor(private action$: Actions, private service: DataService) { }

    _loadTask = createEffect(() =>
        this.action$.pipe(
            ofType(loadTask),
            exhaustMap((action) => {
                return this.service.GetAllTasks().pipe(
                    map((data: any) => {
                        return loadTaskSuccess({ list: data })
                    }),
                    catchError((_error: any) => of(loadTaskFail({ errormessage: _error.message })))
                )
            })
        ));

    _addTask = createEffect(() =>
        this.action$.pipe(
            ofType(addTask),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addTaskSuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'New task created successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error: any) => of(showalert({ message: 'Failed to create task', resulttype: 'fail' })))
                )
            })
        ));

    _updateTask = createEffect(() =>
        this.action$.pipe(
            ofType(updateTask),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateTaskSuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error: any) => of(showalert({ message: 'Failed to update task', resulttype: 'fail' })))
                )
            })
        ));

    _deleteTask = createEffect(() =>
        this.action$.pipe(
            ofType(deleteTask),
            switchMap((action) => {
                return this.service.Delete(action.taskid).pipe(
                    switchMap((data) => {
                        return of(deleteTaskSuccess({ taskid: action.taskid }),
                            showalert({ message: 'Deleted successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error: any) => of(showalert({ message: 'Failed to delete task', resulttype: 'fail' })))
                )
            })
        ));

}
