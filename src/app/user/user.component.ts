import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';

import { DataService } from '../services/data.service';
import 'rxjs/add/operator/toPromise';

import { Personal } from './personal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  query:String=null;
  id:number;
  private header = new Headers({'Content-Type': 'application/json'});
  users:Personal[];
  constructor(private dataService:DataService,private http:Http) { 
    console.log('contructor run...');
    this.getallpersonal();
  }

  getallpersonal(){
    this.dataService.getData().subscribe((users) =>{
      console.log(users);
      this.users=users;
    });
  }
  
  searchperson(){
    this.dataService.searchPerson(this.query).subscribe((users) =>{
      console.log(users);
      this.users=users;
    });
  }

  deleteuser = function(id){
    if(confirm('Are you sure???')){
      const url =`${"http://10.225.3.204:8080/Application/personal"}/${id}`;
      return this.http.delete(url,{headers:this.header}).toPromise()
      .then(()=>{
        this.getallpersonal();
      })
    }
  }
  ngOnInit() {
    // this.getData();
  }
  
  

}
interface Address{
  street:string,
  city:string,
  state:string
}
// interface User{
//   id_personal:number,
//   name_personal:string,
//   date_personal:String,
//   address_personal:String,
//   sex_personal:string,
//   numberphone_personal: number
// }
