import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  data! : any;
  winer: any;
  constructor(private api: ApiService){
    
  }
  ngOnInit(): void {
   this.data = this.api.cal;
   console.log(this.data);
  }
  // check(){
  //   this.winer = this.data.Win
  //   console.log("The Winer is "+this.winer);
    
  // }
  
}
