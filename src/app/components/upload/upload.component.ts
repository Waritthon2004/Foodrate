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
import { LoaddingComponent } from '../loadding/loadding.component';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatIconModule,RouterModule,CommonModule,ConfirmComponent, MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    LoaddingComponent
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
    let  x   = localStorage.getItem('type')||2;
    if(x  == 1){
      this.route.navigate(['/admin']);
    }
    else if(x == 2){
      this.route.navigate(['']);

    }
  
    this.id = localStorage.getItem('id');
    
    this.loadImageWithPopup() ;
  }

  async loadImageWithPopup() {
    let dialogRef = this.dialog.open(LoaddingComponent, {
      width: '250px',
      height: '250px',
      data: { message: 'Loading...' }
    });
  
    try {
      const response = await this.api.getImageById(this.id);
      this.img = response; 
      if(this.img.length != 5){
        for(let i = this.img.length;i!=5;i++){
          this.img.push({url: null});
      }
    }
    } catch (error) {
      console.error('Failed to load image:', error);
      // Handle error (e.g., show error message)
    } finally {
        dialogRef.close();
    }
  }

async delete(id: any) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '400px'; // Set width
  dialogConfig.height = '300px'; // Set height
  const dialogRef = this.dialog.open(ConfirmComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(async result => {
    if (result) {
      const response = await this.api.deleteIMG(id);
      this.loadImageWithPopup() ;
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
    let dialogRef = this.dialog.open(LoaddingComponent, {
      width: '250px',
      height: '250px',
    });
    const file  = event.target.files[0];
    const formData = new FormData();
    formData.append('file',file);
    try {
      await this.api.insertPicture(formData,this.id);
    } catch (error) {
      
    }   
    setTimeout(() => {
      dialogRef.close();  
      this.loadImageWithPopup();
    }, 3000);
    
}

  back() {
    window.history.back();
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
}
