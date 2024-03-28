import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogConfig } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { ShowComponent } from '../show/show.component';
import { LoaddingComponent } from '../loadding/loadding.component';
@Component({
  selector: 'app-votelogin',
  standalone: true,
  imports: [MatIconModule,RouterModule,RouterLink,MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,DialogComponent,LoaddingComponent,CommonModule],
  templateUrl: './votelogin.component.html',
  styleUrl: './votelogin.component.scss'
})
export class VoteloginComponent implements OnInit {


  image: any;
  id : any;
  name : any;
  imgProfile:any;
  remain : any;
  constructor(private api: ApiService,private route : Router,public dialog: MatDialog) {
  }
  ngOnInit(): void {
    let  x   = localStorage.getItem('type')||2;
    if(x  == 1){
      this.route.navigate(['/admin']);
    }
    else if(x == 2){
      this.route.navigate(['']);

    }
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(new Date(), 'YYYY-MM-dd')
    console.log(formattedDate);
    
    this.id = localStorage.getItem('id');
    this.getData(this.id);
    this.loadImageWithPopup();
  }
  data : any;
  async getData(id:any){
    const response = await this.api.getUserById(id)
    this.data = response;
    localStorage.setItem('user',this.data[0].Firstname);
    localStorage.setItem('img',this.data[0].image);
    this.imgProfile = localStorage.getItem('img');
    this.name = localStorage.getItem('user');
    //console.log(localStorage.getItem('user'));
    
  }
  
  async loadImageWithPopup() {
    let dialogRef = this.dialog.open(LoaddingComponent, {
      width: '250px',
      height: '250px',
      data: { message: 'Loading...' }
    });
  
    try {
      let x = localStorage.getItem('Timedelay');
      this.image = await this.api.getImage(x);
      console.log(this.image);
      
    } catch (error) {

    } finally {
        dialogRef.close();
    }
  }
  
  
 

  async Awin() {
    let json = {
      win: 1,
      URL1: this.image.image1,
      URL2: this.image.image2,
      PID1: this.image.pid1,
      PID2: this.image.pid2,
      point1: this.image.point1,
      point2: this.image.point2,
    };
    this.remain = json;
    this.api.cal = await this.api.putPoint(json);
    this.dialog.open(DialogComponent);
  }

  async Bwin() {
    let json = {
      win: 2,
      URL1: this.image.image1,
      URL2: this.image.image2,
      PID1: this.image.pid1,
      PID2: this.image.pid2,
      point1: this.image.point1,
      point2: this.image.point2,
    };
    this.remain= json;
    this.api.cal = await this.api.putPoint(json);
    this.dialog.open(DialogComponent);
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
  
 async open(i: number) {
    if (i == 1) {
      this.Awin();
    }
    if (i == 2) {
      this.Bwin();
    }
    try {
      await this.api.postimg(this.remain);
     this.loadImageWithPopup();
    } catch (error) {
      
    }
    
  }


  show() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px'; // Set width
    dialogConfig.height = '300px'; // Set height
     this.dialog.open(ShowComponent, dialogConfig);
  }
}