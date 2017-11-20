import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { Task } from './task';
import { Router } from '@angular/router';

@Injectable()
export class TaskService {

  constructor(private http:Http,private router:Router) { }
  tasks:Task;
  getTask(){
    return this.http.get('http://10.225.3.204:8080/Application/task')
    .map(res=>res.json());
  }

  getTaskById(id){
    return this.http.get('http://10.225.3.204:8080/Application/task/'+id)
    .map(res=>res.json());
  }

  addTask = function(task){
    this.tasks = task;
    this.http.post('http://10.225.3.204:8080/Application/task',this.tasks).subscribe((res:Response)=>{
      this.router.navigate(['/task']);
    });
  }
  
  getpersonalByIdTask(id){
    return this.http.get('http://10.225.3.204:8080/Application/personaltask/getpersonalbyidtask/'+id)
    .map(res=>res.json());
  }
  // addPersonlByTask(idpersonal,idtask){
  //   this.personal_task.id_personal=idpersonal;
  //   this.personal_task.id_task=idtask;
  //   this.http.post('http://localhost:8080/Application//personaltask/'+idpersonal+'/'+idtask,this.personal_task).map(res=>res.json());
  // }
  personal_task={
    id_personal_task:null,
    id_personal:null,
    id_task:null
  }
}
