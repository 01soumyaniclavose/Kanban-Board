import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { TaskEditorComponentComponent } from './task-editor-component.component';

describe('TaskEditorComponentComponent', () => {
  let component: TaskEditorComponentComponent;
  let fixture: ComponentFixture<TaskEditorComponentComponent>;
  let mockStore: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: MatSnackBar;


  beforeEach(async () => {
    const dialogMock = jasmine.createSpyObj('MatDialog', ['closeAll']);
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [TaskEditorComponentComponent],
      providers: [
        provideMockStore({}),
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        {
          provide: MAT_DIALOG_DATA, useValue: { data: { taskName: 'Test Task', id: 1, status: 'ToDo' }, title: 'Edit Task' }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskEditorComponentComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.taskEditForm.setValue({
      taskName: '',
      id: 0,
      status: ''
    });
    expect(component.taskEditForm.valid).toBeFalsy();
  });

  it('should populate form with dialog data on init', () => {
    expect(component.taskEditForm.value).toEqual({
      taskName: 'Test Task',
      id: 1,
      status: 'ToDo'
    });
  });

  it('should close the dialog when closeClick is called', () => {
    component.closeClick();
    expect(dialog.closeAll).toHaveBeenCalled();
  });

  it('should dispatch addTask when saving a new task', () => {
    component.taskEditForm.setValue({ taskName: 'New Task', id: 0, status: 'ToDo' });
    const spy = spyOn(mockStore, 'dispatch');
    component.save();
    expect(spy).toHaveBeenCalled();
    expect(dialog.closeAll).toHaveBeenCalled();
  });

  it('should dispatch updateTask when editing an existing task', () => {
    component.taskEditForm.setValue({ taskName: 'Updated Task', id: 1, status: 'ToDo' });
    const spy = spyOn(mockStore, 'dispatch');
    component.save();
    expect(spy).toHaveBeenCalledWith(jasmine.anything());
    expect(dialog.closeAll).toHaveBeenCalled();
  });
});
