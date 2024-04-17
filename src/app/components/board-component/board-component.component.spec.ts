import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BoardComponentComponent } from './board-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { deleteTask, loadTask, updateTask } from 'src/app/Store/Task/Task.Action';
import { TaskEditorComponentComponent } from '../task-editor-component/task-editor-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTaskList } from 'src/app/Store/Task/Task.Selectors';

describe('BoardComponentComponent', () => {
  let component: BoardComponentComponent;
  let fixture: ComponentFixture<BoardComponentComponent>;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [BoardComponentComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: getTaskList, value: [] }
          ]
        }),
        { provide: MatDialog, useValue: dialog }
      ],
      imports: [MatDialogModule, BrowserAnimationsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    component.taskArray = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTask on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(loadTask());
  });

  it('should filter tasks by status', () => {
    component.taskArray = [
      { id: 1, taskName: "Task 1", status: "ToDo" },
      { id: 2, taskName: "Task 2", status: "Done" }
    ];
    const filteredTasks = component.filterTask("ToDo");
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].taskName).toEqual("Task 1");
  });

  it('should open a dialog to edit a task', () => {
    const task = { id: 1, taskName: "Task 1", status: "ToDo" };
    component.editTask(task);
    expect(dialog.open).toHaveBeenCalledWith(TaskEditorComponentComponent, {
      width: '50%',
      data: { title: "Edit task", data: task }
    });
  });

  it('should dispatch updateTask when dropping a task to new status', () => {
    const event = { preventDefault: jasmine.createSpy('preventDefault') };
    component.taskArray = [{ id: 1, taskName: "Task 1", status: "ToDo" }];
    component.currentTask = { id: 1, taskName: "Task 1", status: "Done" };

    const spy = spyOn(store, 'dispatch');
    component.onDrop(event, "Done");
    expect(event.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(updateTask({ inputdata: { id: 1, taskName: "Task 1", status: "Done" } }));
  });

  it('should dispatch deleteTask when deleteTask is confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(store, 'dispatch');
    component.deleteTask({ id: 1 });
    expect(spy).toHaveBeenCalledWith(deleteTask({ taskid: 1 }));
  });

  it('should set currentTask when onDragstart is called', () => {
    const mockTask = { id: 1, taskName: 'Test Task', status: 'ToDo' };
    component.onDragstart(mockTask);
    expect(component.currentTask).toEqual(mockTask);
    expect(component.currentTask).toBe(mockTask);
  });

  it('should call preventDefault when onDragover is called', () => {
    const event = { preventDefault: jasmine.createSpy('preventDefault') };
    component.onDragover(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
