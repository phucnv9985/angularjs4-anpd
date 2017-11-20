import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Router } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { DataService } from './services/data.service';
import { EdituserComponent } from './edituser/edituser.component';
import { AdduserComponent } from './adduser/adduser.component';

import { TaskComponent } from './task/task.component';
import { AddtaskComponent } from './task/addtask/addtask.component';
import { EdittaskComponent } from './task/edittask/edittask.component';
import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
import { UploadFileComponent } from './upload/upload-file/upload-file.component';
import { UploadFileService } from './upload/upload-file.service';
import { TaskService } from './task/task.service';
import { DetailPersonalComponent } from './detail-personal/detail-personal.component';
import { TaskIdpersonComponent } from './task/task-idperson/task-idperson.component';
import { DetailTaskComponent } from './task/detail-task/detail-task.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    EdituserComponent,
    AdduserComponent,
    TaskComponent,
    AddtaskComponent,
    EdittaskComponent,
    DetailsUploadComponent,
    FormUploadComponent,
    ListUploadComponent,
    UploadFileComponent,
    DetailPersonalComponent,
    TaskIdpersonComponent,
    DetailTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:UserComponent},
      {path:"addpersonal",component:AdduserComponent},
      {path:"updatepersonal/:id",component:EdituserComponent},
      {path:"task",component:TaskComponent},
      {path:"task/addtask",component:AddtaskComponent},
      {path:"task/updatetask/:id",component:EdituserComponent},
      {path:"task/detailtask/:id",component:DetailTaskComponent},
      {path:"task/idpersonal/:id",component:TaskIdpersonComponent},
    ]),
    NgxPaginationModule,
    
  ],
  providers: [
    DataService,
    UploadFileService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
