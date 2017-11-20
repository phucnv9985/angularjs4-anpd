import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Task } from '../../task/task';
import { Http,Response,Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { PersonalTask } from '../personal-task';
import { TaskService } from '../task.service';
import { UploadFileService } from 'app/upload/upload-file.service';
import { Console } from '@angular/core/src/console';
import { Personal } from '../../user/personal';
import { isError } from 'util';

@Component({
  selector: 'app-task-idperson',
  templateUrl: './task-idperson.component.html',
  styleUrls: ['./task-idperson.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskIdpersonComponent implements OnInit {

  url="http://localhost:8080/Application/personaltask/";
  isError: boolean=false;
  isImage=false;
  personaltask:PersonalTask;
  personaltasks={
    id_personal_task:null,
    id_task:null,
    id_personal:null
  }
  id:number;
  task:Task;
  tasks:Task[];
  selectedvalue;
  isclickadd: boolean=false;
  personal:Personal;
  // personal={
  //   name_personal: "Duy An",
  //   date_personal: "2017-11-21",
  //   create_date: "1510556819508",
  //   sex_personal: "male",
  //   address_personal: "Nam Dinh",
  //   numberphone_personal: "2312252",
  //   email: "phamduyan@gmail.com",
  //   image: "Luyen-nghe-tieng-anh-hieu-qua-3 (1).jpg",
  //   position: "positon5"
  // }
  private header = new Headers({'Content-Type': 'application/json'});
  constructor(private route:ActivatedRoute,private dataService:DataService,private http:Http,private router:Router,private taskService:TaskService,private uploadService: UploadFileService) { 
    this.route.params.subscribe(
      params =>{
        this.id = +params['id'];
      }
    );
    console.log("ID person is "+this.id);
    this.getpersonalById(this.id);
    this.getaskbyidpersonal(this.id);
    this.getalltask();
  }

  routers(id){
    this.router.navigate(['/task/detailtask/'+id]);
  }
  isClickadd(){
    if(this.isclickadd===false)
    {this.isclickadd = true;}
    else{
      this.isclickadd=false;
    }
  }

  isClickImage(){
    if(this.isImage===false){
    this.isImage=true;}
    else this.isImage=false;
    
  }

  ngOnInit() {
    
  }

  //add task moi vao bang task va bang trung gian
  addnewtask(task){
    this.tasks = task;
    this.http.post('http://10.225.3.204:8080/Application/task/'+this.id,this.tasks).subscribe((res:Response)=>{
    this.isNewTask=false;
    this.getaskbyidpersonal(this.id);
    });
    
  }

  addtaskByPerson(idpersonal){
    this.personaltasks.id_personal=idpersonal;
    this.personaltasks.id_task=this.selectedvalue;
    try{
      this.http.post(this.url,this.personaltasks).subscribe((res:Response)=>{
      this.isclickadd=false;
      this.getaskbyidpersonal(idpersonal);
      alert("This task is added by "+this.personal.name_personal);
  });
    }catch(error){
        alert("This task is added!!");
    }
    
  }
  delete(idpersonal,idtask){
    if(confirm('Are you sure???')){
      this.dataService.getTaskByIdPersonalandidtask(idpersonal,idtask).subscribe((personaltasks)=>{
        this.personaltask=personaltasks;
        console.log("personal task "+ this.personaltask.id_personal_task);
        this.dataService.deletepersonaltask(this.personaltask.id_personal_task)
      .then(()=>{
        this.getaskbyidpersonal(this.id);
      })
      });
    }
  }

  isNewTask=false;
 IsNewTask(){
   if(this.isNewTask===true){
     this.isNewTask=false;
   }
   else{
     this.isNewTask=true;
   }
 }
  getpersonalById(id){
    this.dataService.getpersonalById(id).subscribe((personal)=>{
      this.personal=personal;
    });
  }
  
  getaskbyidpersonal(id){
    this.dataService.getTaskByIdPersonal(id).subscribe((task) =>{
      console.log(task);
      this.task=task;
    });
  }

  getalltask(){
    this.taskService.getTask().subscribe((task)=>{
      this.tasks=task;
    })
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
  
  isSelectedcheckbox(idtask){
    return (this.checkBoxselected.indexOf(idtask) !== -1);
  }
  deleteSelectedCheckBox() {
    if (this.checkBoxselected.length != 0) {
      if (confirm("Are you sure!")){
        for(let i=0;i<this.checkBoxselected.length;i++)
        this.delete(this.id,this.checkBoxselected[i]);
        console.log("Delete successfull! ");
        alert("Delete successfull!");
      }else{

      }
    }else{
      alert("Please select Object !");
    }
  }
  changeImage(){
    this.upload();
    console.log(this.personal);
    console.log("name File Select " +this.currentFileUpload.name);
    this.personal.image=this.currentFileUpload.name;
    console.log("image "+ this.personal.image);
    this.http.put("http://10.225.3.204:8080/Application/personal/"+this.id, JSON.stringify(this.personal),{headers:this.header}).toPromise()
    .then(()=>{
      this.router.navigate(['/task/idpersonal/'+this.id]);//go to Home
      this.isClickImage();
    });
  }

  //Upload file
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })
    console.log(this.currentFileUpload.name);
    this.selectedFiles = undefined;
  }

}
