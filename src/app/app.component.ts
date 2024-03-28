import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  title = 'Foodrate';
  
  x : any;
  constructor(private api : ApiService){}
  ngOnInit(): void {
      this.check();
  }

  async new(){
    await this.api.newday();
  }

  async check(){
     this.x = await this.api.checkday();
     if(this.x.do == "False"){
    }
    if(this.x.do == "True"){
      this.new();
    }
  }
}
