import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { RouterModule,Router,ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  isUpdate:boolean=false;
  id:number;
  data=[];
  users=[];
  userObj:any;
  private header = new Headers({'Content-Type': 'application/json'});
  constructor(private router:Router,private route:ActivatedRoute,private http:Http ) { }
  edituser(user){
    this.userObj = {
      "name_personal":user.name_personal,
      "date_personal":user.date_personal,
      "address_personal":user.address_personal,
      "sex_personal":user.sex_personal,
      "numberphone_personal": user.numberphone_personal
    }
    const url =`${"http://localhost:8080/Application/personal"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.userObj), {headers:this.header}).toPromise()
    .then(()=>{
      this.router.navigate(['/']);//go to Home
    });
  }
  ngOnInit() {
    //console.log(this.id);
    this.route.params.subscribe(
      params =>{
        this.id = +params['id'];
      }
    )
    this.http.get("http://localhost:8080/Application/api/personal").subscribe(
      (res:Response)=>{
        this.users=res.json();
        for(var i=0;i<this.users.length;i++){
          if(parseInt(this.users[i].id_personal)==this.id){
            this.isUpdate = true;
            this.data = this.users[i];
            console.log(this.data);
            break;
          }
          else{
            this.isUpdate = false;
          }
        }
      }
    )
  }

}
