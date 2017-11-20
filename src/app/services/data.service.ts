import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private header = new Headers({'Content-Type': 'application/json'});
  constructor(public http:Http) {
    console.log('Service run');
  }

  searchPerson(query){
    return this.http.get('http://10.225.3.204:8080/Application/personal/search/'+query)
    .map(res=>res.json());
  }

  getData(){
    return this.http.get('http://10.225.3.204:8080/Application/personal')
    .map(res=>res.json());
  }
  getTaskByIdPersonal(id){
    return this.http.get('http://10.225.3.204:8080/Application/personaltask/gettaskbyidperonal/'+id)
    .map(res=>res.json());
  }
  getTaskByIdPersonalandidtask(idpersonal,idtask){
    return this.http.get('http://10.225.3.204:8080/Application/personaltask/'+idpersonal+"/"+idtask)
    .map(res=>res.json());
  }
  deletepersonaltask(id){
    return this.http.delete(`${"http://10.225.3.204:8080/Application/personaltask"}/${id}`,{headers:this.header}).toPromise();
  }

  getpersonalById(id){
  return this.http.get('http://10.225.3.204:8080/Application/personal/'+id)
  .map(res=>res.json());
 }
  personal_task={
    id_personal_task:null,
    id_personal:null,
    id_task:null
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
