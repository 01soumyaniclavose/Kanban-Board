import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeaderComponentComponent } from './header-component.component';
import { TaskEditorComponentComponent } from '../task-editor-component/task-editor-component.component';

describe('HeaderComponentComponent', () => {
  let component: HeaderComponentComponent;
  let fixture: ComponentFixture<HeaderComponentComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponentComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialog, useValue: dialog }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog with the correct title when openDialog is called', () => {
    const testTitle = "Test Dialog";
    component.openDialog(testTitle);
    expect(dialog.open).toHaveBeenCalledWith(TaskEditorComponentComponent, {
      width: '50%',
      data: { title: testTitle }
    });
  });

  it('should open a dialog for adding a new task when openTaskPage is called', () => {
    const expectedTitle = "Add new task ";
    component.openTaskPage();
    expect(dialog.open).toHaveBeenCalledWith(TaskEditorComponentComponent, {
      width: '50%',
      data: { title: expectedTitle }
    });
  });
});
