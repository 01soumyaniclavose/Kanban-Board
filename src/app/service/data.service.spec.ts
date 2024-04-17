import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Task } from '../Store/Model/tasks.model';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;
  let baseUrl = 'http://localhost:3000/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tasks', () => {
    const mockTasks: Task[] = [
      { id: 1, taskName: 'Task 1', status: 'Done' },
      { id: 2, taskName: 'Task 2', status: 'ToDo' },
      { id: 3, taskName: 'Task 2', status: 'Implementing' }
    ];

    service.GetAllTasks().subscribe(tasks => {
      expect(tasks.length).toBe(3);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpTestingController.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should delete the task', () => {
    const mockId = 1;

    service.Delete(mockId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpTestingController.expectOne(`${baseUrl}/${mockId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should edit the task', () => {
    const mockTask: Task = { id: 1, taskName: 'edit Task', status: 'ToDo' };

    service.Update(mockTask).subscribe(response => {
      expect(response).toEqual(mockTask);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/${mockTask.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockTask);
  });

  it('should create a new task', () => {
    const newTask: Task = { id: 3, taskName: 'New Task', status: 'ToDo' };

    service.Create(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpTestingController.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

});
