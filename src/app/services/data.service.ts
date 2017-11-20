import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) {
    console.log('Service run');
  }
  getUser(){
    return this.http.get('http://59f04fd8ce72350012bebfa2.mockapi.io/user')
    .map(res=>res.json());
  }
  // userObj: any;
  // adduser(user){
  //   this.userObj = {
  //     "fullname":user.fullname,
  //     "date":user.date,
  //     "sex":user.sex
  //   }
  //   this.http.post('http://59f04fd8ce72350012bebfa2.mockapi.io/user',this.userObj).subscribe((res:Response)=>{
  //   console.log(res);
  //   });
  // }
}
