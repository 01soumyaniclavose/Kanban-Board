import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/Store/Model/tasks.model';
import { addTask, updateTask } from 'src/app/Store/Task/Task.Action';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-task-editor-component',
  templateUrl: './task-editor-component.component.html',
  styleUrls: ['./task-editor-component.component.scss']
})

export class TaskEditorComponentComponent implements OnInit {

  taskEditForm!: FormGroup;
  randomId: number = 0;
  taskStatu: string = '';
  title: string = '';
  isedit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.taskEditForm = this.fb.group({
      taskName: this.fb.control('', Validators.required),
      id: this.fb.control(0),
      status: this.fb.control('ToDo')
    });
    this.title = this.data.title
    this.taskEditForm.setValue({
      taskName: this.data.data.taskName,
      id: this.data.data.id,
      status: this.data.data.status
    });
  }

  closeClick(): void {
    this.dialogRef.closeAll();
  }

  save() {
    if (this.taskEditForm.valid) {
      const _obj: Task = {
        id: this.taskEditForm.value.id as number,
        taskName: this.taskEditForm.value.taskName as string,
        status: this.taskEditForm.value.status
      }
      if (_obj.id === 0) { //NOTE: New task
        this.getRandomTaskId();
        _obj.id = this.randomId;
        this.store.dispatch(addTask({ inputdata: _obj }))
      } else { //NOTE: Edit task
        this.store.dispatch(updateTask({ inputdata: _obj }))
      }
      this.dialogRef.closeAll();
    }
  }

  getRandomTaskId(): number {
    return this.randomId = Math.floor(Math.random() * 100); //NOTE: id create function 
  }
}