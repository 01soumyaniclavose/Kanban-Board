import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskEditorComponentComponent } from '../task-editor-component/task-editor-component.component';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(title: string) {
    const dialogRef = this.dialog.open(TaskEditorComponentComponent, {
      width: '50%',
      data: {
        title: title
      }
    });
  }

  openTaskPage() {
    const title = "Add new task "
    this.openDialog(title);
  }
}
