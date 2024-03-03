import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-standing',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './standing.component.html',
  styleUrl: './standing.component.scss'
})
export class StandingComponent implements OnInit{
  data! : any;
  constructor(private api : ApiService){
export class StandingComponent {
back() {
window.history.back();
}

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
  
}
