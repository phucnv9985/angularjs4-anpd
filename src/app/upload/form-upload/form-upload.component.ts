import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../upload-file.service';
 
@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
 
  selectedFiles: Array<File> = [];
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
 
  constructor(private uploadService: UploadFileService) { }
 
  ngOnInit() {
  }
 
  //get  event from html
  selectFile(event) {
    this.selectedFiles = <Array<File>>event.target.files;
  }
 
  upload() {
    this.progress.percentage = 0;
    const formData: any = new FormData();
      const files: Array<File> = this.selectedFiles;
      console.log(files);
      for(let i =0; i < files.length; i++){
        this.currentFileUpload = this.selectedFiles[i];
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } 
        else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      })
    }
    this.selectedFiles = undefined
  }
}