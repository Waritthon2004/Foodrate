import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-standing',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink],
  templateUrl: './standing.component.html',
  styleUrl: './standing.component.scss'
})
export class StandingComponent implements OnInit{
  name = localStorage.getItem('user');
  data! : any;
  constructor(private api : ApiService,private route:Router){

}

  
  back() {
    window.history.back();
  }

  ngOnInit(): void {
   this.loaddata();
  }

  async loaddata(){
     this.data = await this.api.getstandind();
     console.log(this.data);
     console.log(this.data.length);
     if(this.data.length !=10){
        for(let i = this.data.length ; i< 10;i++){
          this.data.push("");
        }
     }
     
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
}