import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatIconModule,RouterModule,CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {


img: any;
data : any;
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.selectIMG();
  }
  async selectIMG(){
    const response = await this.api.getImageAll();
    this.img = response; 
    if(this.img.length != 5){
      for(let i = this.img.length;i!=5;i++){
        this.img.push({url: null});
    }
  }
  console.log(this.img);
}
async delete(id:any) {
  const response = await this.api.deleteIMG(id);
  this.selectIMG();
  
  }
  // onChangeFile(event: any) {
  //   const file  = event.target.files[0];
  //   const formData = new FormData();
  //   this.data = formData.append('file',file);
  //  // this.http.put('http://localhost:3000/upload/image',formData).subscribe((res:any)=>{ })
  // }
   async onChangeFile(event: any) {
    const file  = event.target.files[0];
    const formData = new FormData();
    this.data = formData.append('file',file);
    const response = await this.api.insertPicture(formData);
   this.selectIMG();

  }
  back() {
    window.history.back();
  }
}
