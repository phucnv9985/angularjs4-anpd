import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TaskService } from '../../task/task.service';
import { Task } from '../../task/task';
import { DataService } from '../../services/data.service';
import { Personal } from '../../user/personal';
import { PersonalTask } from '../personal-task';
import { Http,Response,Headers } from '@angular/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailTaskComponent implements OnInit {

  selectedvalue:number=null;
  id:number;
  isclick:boolean=false;
  personal:Personal[];
  personal1:Personal[];
  tasks={
    id_task: 0,
    name_task: "",
    startdate_task: "",
    enddate_task: "",
    status_task: "",
    detail_task: ""
  }

personaltask={
  id_personal_task:null,
  id_task:null,
  id_personal:null
}
  
  constructor(private route:ActivatedRoute,private taskService:TaskService,private dataService: DataService,private router:Router,private http:Http) {
    this.route.params.subscribe(
      params =>{
        this.id = +params['id'];
      }  
    );
    this.getallpersonal();
    this.getpersonalbyidtask(this.id);
    this.gettaskByidtask(this.id);
   }

   //----------Get all personal-------------
   getallpersonal(){
    this.dataService.getData().subscribe((personal) =>{
      this.personal=personal;
    });
   }

   //--------------Get task ByID-------------
   gettaskByidtask(id){
        this.taskService.getTaskById(id).subscribe((task) =>{
          this.tasks=task;
        });
  }

  //----------------------------get personal By Id
  getpersonalbyidtask(id){
    this.taskService.getpersonalByIdTask(id).subscribe((personal)=>{
      this.personal1=personal;
      console.log(this.personal1);
    });
  }
  addpersonalbytask(idtask){
    try {
      console.log("What's the hell ???");
      this.personaltask.id_personal=this.selectedvalue;
      this.personaltask.id_task=idtask;
      console.log(this.personaltask);
      this.http.post('http://10.225.3.204:8080/Application/personaltask/',this.personaltask).subscribe((res:Response)=>{
        this.isclick=false;
        this.getpersonalbyidtask(idtask);
    });
    } catch (error) {
      alert("Person Exist");
    }
    
  }

  isClick(){
    if(this.isclick===false){
      this.isclick=true;
    }
    else{
      this.isclick=false;
    }
    
  }
  ngOnInit() {
    this.gettaskByidtask(this.id);
  }
  //Delete Select Box
  checkBoxselected = [];
  checkBox(e, id) {
    if (e.target.checked) {
      this.checkBoxselected.push(id);
    } else {
      let indexid = this.checkBoxselected.indexOf(id);
      this.checkBoxselected.splice((indexid), 1);
    }
  }
  delete(idpersonal,idtask){
    if(confirm('Are you sure???')){
      this.dataService.getTaskByIdPersonalandidtask(idpersonal,idtask).subscribe((personaltasks)=>{
        this.personaltask=personaltasks;
        console.log(this.personaltask);
        console.log("personal task "+ this.personaltask.id_personal_task);
        this.dataService.deletepersonaltask(this.personaltask.id_personal_task)
      .then(()=>{
        this.getpersonalbyidtask(this.id);
      })
      });
    }
  }
  isSelectedcheckbox(idtask){
    return (this.checkBoxselected.indexOf(idtask) !== -1);
  }
  deleteSelectedCheckBox() {
    if (this.checkBoxselected.length != 0) {
      if (confirm("Are you sure!")){
        for(let i=0;i<this.checkBoxselected.length;i++)
        this.delete(this.checkBoxselected[i],this.id);
        console.log("Delete successfull! ");
      }else{

      }
    }else{
      alert("Please select Object !");
    }
  }

}
