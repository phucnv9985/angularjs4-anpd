import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  status:boolean=true;
  task:Task;
  selectedValue:string=null;
  constructor( private taskService:TaskService) { }

  addtask(task){
    this.taskService.addTask(task);
  }
  
  ngOnInit() {
  }

}
