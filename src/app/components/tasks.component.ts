import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models/todo';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent{

  @Input()
  tasks!: Todo[] // To receive inputs from the parent component as property binding [ ]

  @Output()
  onModifyTask = new Subject<number>

  deleteTask(idx: number) {
    this.tasks.splice(idx, 1);
  }

  // (click) event that will activate modifyTask function that sends the
  // index to the parent
  modifyTask(idx: number) {
    this.onModifyTask.next(idx)
  }
}
