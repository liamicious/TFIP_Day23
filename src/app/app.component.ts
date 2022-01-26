import { Component } from '@angular/core';

// import form group
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';

// import uuid
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TFIP_Day23';
  // this method requires it to be initialised in a constructor as compared to the slides (onInit)
  // retrieving data is always on Init, never in constructor
  form: FormGroup;

  // declare/initialise the respective FormControls
  taskFormControl = new FormControl('', [Validators.required])
  priorityFormControl = new FormControl('', [Validators.required])
  dueDateFormControl = new FormControl('', [Validators.required])
  tomorrow = new Date();
  todosValues: Todo[]= [];
  priorities = ["Low", "Medium", "High", "Urgent!"];

  constructor(private fb: FormBuilder){
    this.tomorrow.setDate(this.tomorrow.getDate()+1);
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }

  addTodo() {
    console.log("add todo: ");
    // call the uuid function
    let taskId = uuidv4();
    let singleTodo = new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId
    )

    this.todosValues.push(singleTodo),
    this.taskFormControl.reset(),
    this.priorityFormControl.reset(),
    this.dueDateFormControl.reset(),
    localStorage.setItem(taskId, JSON.stringify(singleTodo))
  }

}
