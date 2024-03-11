import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-standing',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink,MatFormFieldModule,FormsModule,MatSelectModule],
  templateUrl: './standing.component.html',
  styleUrl: './standing.component.scss'
})
export class StandingComponent implements OnInit{

  name = localStorage.getItem('user');
  data : any;
  pv : any;
  constructor(private api : ApiService,private route:Router){

}

  imgProfile = localStorage.getItem('img');
  back() {
    window.history.back();
  }

  ngOnInit(): void {
  
      this.loaddata();
  //  this.selectPrevious();
       
   
  }

  async loaddata(){
     this.data = await this.api.getstandind();
     if(this.data.length !=10){
        for(let i = this.data.length ; i< 10;i++){
          this.data.push("");
        }
     }

     let result = await this.api.getPerviousDay()
     this.pv = result;
   
     if(this.pv.length !=10 ){
       for(let i = this.pv.length ; i< 10;i++){
         this.pv.push("");
       }
      console.log(this.pv);
       
    }
    // console.log(this.pv); 
    // for (let index = 0; index < this.pv.length; index++) {
    //   if(this.pv[index].PID==this.data[index].PID){
    //     console.log(this.pv[index].rank);
    //     break;
    //   }
    // }
 
    
     
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
  // async selectDay(day: MatSelect) {
  //   this.data = await this.api.getFoodDate(day.value)
  //   if(this.data.length !=10){
  //     for(let i = this.data.length ; i< 10;i++){
  //       this.data.push("");
  //     }
  //  }
  // }

  
  check(PID:any){
     for (let index = 0; index < this.pv.length; index++) {
      if(this.pv[index].PID == PID){
        return this.pv[index].rank;
      }
    }
  }
  

}