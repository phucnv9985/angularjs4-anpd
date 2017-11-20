import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  // user1:User1[];
  constructor(private http:Http,private router:Router) { }
  isAdded:boolean=false;
  userObj: any;
  adduser = function(user1){
    this.userObj = {
      "name_personal":user1.name_personal,
      "date_personal":user1.date_personal,
      "address_personal":user1.address_personal,
      "sex_personal":user1.sex_personal,
      "numberphone_personal": user1.numberphone_personal
    }
    this.http.post('http://localhost:8080/Application/personal',this.userObj).subscribe((res:Response)=>{
    this.isAdded=true;this.router.navigate(['/']);
    });
  }
  // userObj: any;
    // this.userObj = {

    //   "fullname":user1.fullname,
    //   "date":user1.date,
    //   "sex":user1.sex
    // }
  // constructor(private dataService:DataService){
  //  this.dataService.adduser()
  // }
  ngOnInit() {
  }
}

