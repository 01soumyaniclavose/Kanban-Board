import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Store/Model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = 'http://localhost:3000/tasks'
  constructor(private http:HttpClient) { }


  GetAllTasks() {
    return this.http.get<Task[]>(this.baseURL);
  }

  Delete(Id: number) {
    return this.http.delete(this.baseURL+ '/' + Id);
  }

  Update(data: Task) {
    return this.http.put(`${this.baseURL}/${data.id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  Create(data: Task) {
    return this.http.post(this.baseURL, data);
  } 

}
