import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/Store/Model/tasks.model';
import { deleteTask, getTask, loadTask, updateTask } from 'src/app/Store/Task/Task.Action';
import { getTaskList } from 'src/app/Store/Task/Task.Selectors';
import { DataService } from 'src/app/service/data.service';
import { TaskEditorComponentComponent } from '../task-editor-component/task-editor-component.component';


@Component({
  selector: 'app-board-component',
  templateUrl: './board-component.component.html',
  styleUrls: ['./board-component.component.scss']
})
export class BoardComponentComponent implements OnInit {

  currentTask: any = [];
  taskArray!: Task[];

  constructor(
    private dataService: DataService,
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadTask());
    this.store.select(getTaskList).subscribe(item => {
      this.taskArray = item
    })
    console.log(this.taskArray)
  }

  filterTask(status: string) {
    return this.taskArray.filter(m => m.status == status)
  }

  onDragstart(task: any) {
    this.currentTask = task
  }

  //NOTE: Tigger when an item drop in to new task position
  //Here updating the task status with new value
  onDrop(event: any, status: any) {
    event.preventDefault();
    console.log(this.currentTask)
    const record = this.taskArray.find(m => m.id == this.currentTask.id);
    if (record != undefined) {
      const _obj: Task = {
        id: this.currentTask.id as number,
        taskName: this.currentTask.taskName as string,
        status: status
      }
      this.store.dispatch(updateTask({ inputdata: _obj }))
    }
  }

  onDragover(event: any) {
    event.preventDefault();
  }

  editTask(item: any) {
    const title = "Edit task"
    this.openDialog(title, item);
  }

  openDialog(title: string, data: any) {
    const dialogRef = this.dialog.open(TaskEditorComponentComponent, {
      width: '50%',
      data: {
        title: title,
        data: data
      }
    });
  }

  deleteTask(item: any): void {
    if (confirm('do you want to delete the task?')) {
      this.store.dispatch(deleteTask({ taskid: item.id }))
    }
  }
}
