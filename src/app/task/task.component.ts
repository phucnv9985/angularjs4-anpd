import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { TaskService } from './task.service';
import { Task } from './task';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  id:number;
  task:Task[];
  
  private header = new Headers({'Content-Type': 'application/json'});
  constructor(private http:Http,private taskService:TaskService,private dataService:DataService) { 
    this.gettask();
  }

  ngOnInit() {
  }



  gettask(){
    this.taskService.getTask().subscribe((task) =>{
          console.log(task);
          this.task=task;
        });
  }

  deletetask(id){
    if(confirm('Are you sure???')){
      const url =`${"http://10.225.3.204:8080/Application/task"}/${id}`;
      return this.http.delete(url,{headers:this.header}).toPromise()
      .then(()=>{
        this.gettask();
      })
    }
  }

  //Select Box Delete
  taskselected = [];
  checkedTask(e, id) {
    if (e.target.checked) {
      this.taskselected.push(id);
    } else {
      let indexid = this.taskselected.indexOf(id);
      this.taskselected.splice((indexid), 1);
    }
  }

  isTaskSelected(idtask){
    return (this.taskselected.indexOf(idtask) !== -1);
  }

  

  deleteSelectedTask() {
    if (this.taskselected.length != 0) {
      if (confirm("Are you sure you want delete all selected person !")){
        for(let i=0;i<this.taskselected.length;i++)
        this.deletetask(this.taskselected[i]);
        console.log("Delete successfull! ");
      }else{

      }
    }else{
      alert("Please select Object!");
    }
  }
}
