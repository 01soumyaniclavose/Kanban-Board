# KanbanBoard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Introduction
The Kanban Board application should have the following features:
1.	The board have three columns: “To Do”, “Implementing” and “Done”.
2.	Each column display tasks described as plain text.
3.	It have a form consisting of one text input field and a button allowing users to create new tasks. New tasks is add to the “To Do” column.
4.	Drag-and-drop task between colums 
5.	Delet task 
   
## Libraries used 
1.	Angular material v14 : https://v13.material.angular.io/
2.	NGRX : https://ngrx.io/

## Database
JSON server 
PATH: src/data/db.json
RUN Command : json-server --watch src/data/db.json
PORT : http://localhost:3000/tasks

## Unit Testing
Jasmin karma
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Step to run the application
1.	Git Clone
2.	npm install
3.	Run JSON server
4.	ng serve Navigate to `http://localhost:4200/`. 

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

