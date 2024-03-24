import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {  Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatDialogConfig } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  
} from '@angular/material/dialog';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatIconModule,RouterModule,CommonModule,ConfirmComponent, MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
img: any;
data : any;
id : any;
name = localStorage.getItem('user');
imgProfile = localStorage.getItem('img')
  constructor(private api:ApiService,private route:Router,public dialog: MatDialog){}
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    
    this.selectIMG();
  }
  async selectIMG(){
    const response = await this.api.getImageById(this.id);
    this.img = response; 
    if(this.img.length != 5){
      for(let i = this.img.length;i!=5;i++){
        this.img.push({url: null});
    }
  }
  console.log(this.img);
}
async delete(id: any) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '400px'; // Set width
  dialogConfig.height = '300px'; // Set height
  const dialogRef = this.dialog.open(ConfirmComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(async result => {
    if (result) {
      const response = await this.api.deleteIMG(id);
      this.selectIMG();
    }
  });
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
    formData.append('file',file);
    try {
      await this.api.insertPicture(formData,this.id);
      this.selectIMG();
    } catch (error) {
      
    }
}

  back() {
    window.history.back();
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
}
