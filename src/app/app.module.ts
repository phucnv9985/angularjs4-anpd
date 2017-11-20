import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Router } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { DataService } from './services/data.service';
import { EdituserComponent } from './edituser/edituser.component';
import { AdduserComponent } from './adduser/adduser.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TaskComponent } from './task/task.component';
import { AddtaskComponent } from './task/addtask/addtask.component';
import { EdittaskComponent } from './task/edittask/edittask.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    EdituserComponent,
    AdduserComponent,
    TaskComponent,
    AddtaskComponent,
    EdittaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'',component:UserComponent},
      {path:"addpersonal",component:AdduserComponent},
      {path:"updatepersonal/:id",component:EdituserComponent},
      {path:"task",component:TaskComponent},
      {path:"task/addtask",component:AddtaskComponent},
      {path:"task/updatetask/:id",component:EdituserComponent},
    ]),
    NgxPaginationModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
