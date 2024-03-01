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
    const response = await this.api.getImage();
    this.img = response;
    
    
    if(this.img.length != 5){
      for(let i = 0;i<5-this.img.length;i++){
         this.img.push({url: null});
    }
  }
  console.log(this.img);
}
}
