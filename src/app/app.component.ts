import { Component } from '@angular/core';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Day32-Workshop';

  // taskList as a Todo class array. Captures the Todo objects and put it in an array
  taskList: Todo[] = []; // Can be used to send to the child component as an Input()

  parentSelectedTask!: Todo;

  parentIdx?: number;

  addTask(todo: Todo) {
    console.log(">>>(parent) Todo received at parent is: ", todo);
    this.taskList.push(todo);
    localStorage.setItem("task", JSON.stringify(this.taskList))
    console.log(">>>(parent) Current taskList: ", this.taskList);
  }

  processModifyTask(i: number) {
    this.parentSelectedTask = this.taskList[i];
    this.parentIdx = i;
    console.log(">>>(parent) Selected task to modify: ", this.parentSelectedTask)
    console.log(">>>(parent) index = ", this.parentIdx)
  }

  restorePrev() {
    const restoreTasks = localStorage.getItem("task");
    // Checks if restoreTasks is null
    if (!restoreTasks)
      return
    this.taskList = JSON.parse(restoreTasks) as Todo[];
    console.log(">>>Restored tasks: ", this.taskList)
  }
} 
