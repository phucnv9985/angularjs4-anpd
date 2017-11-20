import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
@Injectable()
export class UploadFileService {
 
  constructor(private http: HttpClient) {}
 
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', 'http://10.225.3.204:8080/Application/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
 
  getFiles(): Observable<any> {
    return this.http.get('http://10.225.3.204:8080/Application/getallfiles')
  }
}