import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './components/tasks.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
