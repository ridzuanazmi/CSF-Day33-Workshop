import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { Todo } from '../models/todo';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges{

  todoForm!: FormGroup; // Initialize the FormGroup
  todoArray!: FormArray; // Initialize the FormArray

  // List of the current taskList
  @Input() taskToEdit!: Todo; // This is what the OnChanges detect
  @Output() onNewTodo = new Subject<Todo>

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.createTodoForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.todoForm = this.createTodoForm();
  }

  // When the submit button is pressed, it should carry the form inputs
  // to be sent to parent component as output
  addTask() {
    const todo = this.todoForm.value as Todo
    console.log(">>> ToDo: ", todo)
    this.onNewTodo.next(todo) // fire the todo into the parent as output of todo component
    this.todoForm.reset()
  }

  // If the OnChanges detects an input, it will run this method 
  private createTodoForm(): FormGroup {
    return this.fb.group({
      description: this.fb.control<string>(this.taskToEdit? this.taskToEdit.description : '', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>(this.taskToEdit? this.taskToEdit.priority : '', [Validators.required]),
      dueDate: this.fb.control<Date>(this.taskToEdit? this.taskToEdit.dueDate : new Date(), [Validators.required, this.dateValidator()])
    })
  }

  // Useful date validator for forms in Angular!
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        return { 'pastDate': true };
      } else {
        return null;
      }
    };
  }
}
