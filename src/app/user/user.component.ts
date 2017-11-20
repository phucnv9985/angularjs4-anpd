import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';

import { DataService } from '../services/data.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id:number;
  private header = new Headers({'Content-Type': 'application/json'});

  users:User[];
  // constructor(private dataService:DataService) { 
  //   console.log('contructor run...');
  //   this.dataService.getUser().subscribe((users) =>{
  //     console.log(users);
  //     this.users=users;
  //   });
  // }
  
   constructor(private http:Http) { }

  getData= function(){
    this.http.get("http://localhost:8080/Application/personal").subscribe(
      (res:Response)=>{
        this.users=res.json();
      }
    )
  }

  deleteuser = function(id){
    
    if(confirm('Are you sure???')){
      const url =`${"http://localhost:8080/Application/personal"}/${id}`;
      return this.http.delete(url,{header:this.header}).toPromise()
      .then(()=>{
        this.getData();
      })
    }
  }
  ngOnInit() {
    this.getData();
  }
  
  

}
interface Address{
  street:string,
  city:string,
  state:string
}
interface User{
  id_personal:number,
  name_personal:string,
  date_personal:String,
  address_personal:String,
  sex_personal:string,
  numberphone_personal: number
}
