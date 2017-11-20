import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { DataService } from '../services/data.service';
import {FormControl, FormGroup,FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import { Data } from '@angular/router/src/config';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { UploadFileService } from '../upload/upload-file.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  constructor(private http:Http,private router:Router,private uploadService: UploadFileService) { }
  isAdded:boolean=false;
  userObj: any;
  date= Date.now();
  selectedValue: string;
  position = [
    {value: 'positon1', viewValue: 'Positon 1'},
    {value: 'positon2', viewValue: 'Positon 2'},
    {value: 'positon3', viewValue: 'Positon 3'},
    {value: 'positon4', viewValue: 'Positon 4'},
    {value: 'positon5', viewValue: 'Positon 5'}
  ];

  //Add
  adduser = function(user1){
    this.upload();
    this.userObj = {
      "name_personal":user1.name_personal,
      "date_personal":user1.date_personal,
      "address_personal":user1.address_personal,
      "sex_personal":user1.sex_personal,
      "numberphone_personal": user1.numberphone_personal,
      "email":user1.email,
      "create_date":Date.now(),
      "position":user1.position,
      "image":this.currentFileUpload.name
    }
    this.http.post('http://10.225.3.204:8080/Application/personal',this.userObj).subscribe((res:Response)=>{
    this.isAdded=true;this.router.navigate(['/']);
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
  

  
  ngOnInit() {
    
  }
}

