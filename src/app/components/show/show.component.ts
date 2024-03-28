import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit {


  data!: any;
  time : any;
  k:any;
  constructor(private api: ApiService,private dialogRef: MatDialogRef<ShowComponent>) {}

  ngOnInit(): void {
    this.load();

  }
 
  closeDialog(): void {
    this.dialogRef.close();
  }
  async load() {
     this.k = localStorage.getItem('Timedelay');
    this.data = await this.api.getdelay(this.k);

    if (this.k !== null) {
      for (let i = 0 ;i< this.data.length ;i++) {
        let x = parseInt(this.k) - this.data[i].time_diff_seconds;
        this.data[i].time_diff_seconds = x;
        console.log(this.data[i].time_diff_seconds);
        
      }
    }
   await this.timecount()
    
   
  }
  async timecount(){
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].time_diff_seconds > 0) {
      setInterval(() => {
        this.data[i].time_diff_seconds--;
      }, 1000);
    }
  }
  }
updatedelay(delay: any) {
  if(delay.value ){
  
    localStorage.setItem('Timedelay', delay.value);
    this.closeDialog()
    
  }
  else{
    alert("PLS INPUT DELAY");
    
  }
}

}
