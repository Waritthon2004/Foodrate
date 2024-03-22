import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink],
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.scss'
})
export class AllUserComponent implements OnInit{


  img : any;
  users : any;
  count : any;
  user : any;
  all : any;
  constructor(private route:Router,private api:ApiService){}
  ngOnInit(): void {
    this.count = [];
    this.img = localStorage.getItem('img');
    this.load();
  }
  async load (){
     this.all = await this.api.getUser();
      this.users = this.all.data;
      let i = Math.ceil(this.all.Row / 5);
      for(let j = 1; j<=i;j++){
        this.count.push(j);
      }
      
  }

 
logout() {
}
async page(page: any) {
  let json= {
    page : page
  }
    this.users =  await this.api.userpage(json);
    console.log(this.users);
    
  }
}
