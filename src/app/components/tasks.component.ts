import { Component, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  @Input()
  tasks!: Todo[]; // To receive inputs from the parent component as property binding [ ]

  @Output()
  onModifyTask = new Subject<number>;

  restoredTask: Todo[] = []

  deleteTask(idx: number) {
    this.tasks.splice(idx, 1);
    this.restoredTask = this.getTasksFromLocalStorage();
    this.restoredTask.splice(idx, 1);
    localStorage.setItem("task", JSON.stringify(this.restoredTask));
}

  // (click) event that will activate modifyTask function that sends the
  // index to the parent
  modifyTask(idx: number) {
    this.onModifyTask.next(idx);
    this.tasks.splice(idx, 1);
  }

  taskCompleted(idx: number) {
    this.tasks[idx].isCompleted = true;
    console.log(">>> Task completed: ", this.tasks[idx]);
  }

  private getTasksFromLocalStorage(): Todo[] {
    const restoreTasks = localStorage.getItem("task");
    if (!restoreTasks) {
      return [];
    }
    return JSON.parse(restoreTasks) as Todo[];
}
}
