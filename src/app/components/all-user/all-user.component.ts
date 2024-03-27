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
  name : any;
  id:any;
  constructor(private route:Router,private api:ApiService){}
  ngOnInit(): void {
    let  x   = localStorage.getItem('type')||2;
    if(x  == 0){
      this.route.navigate(['/user']);
    }
    else if(x == 2){
      this.route.navigate(['']);

    }
    this.id = localStorage.getItem('id');
    this.count = [];
    this.getData(this.id);
    this.load();
  
  
  }
  async load (){
     this.all = await this.api.getUser();
      this.users = this.all.data;
      let i = Math.ceil(this.all.Row / 5);
      console.log(i);
      
      for(let j = 1; j<=i;j++){
        this.count.push(j);
      }
      console.log(this.users);
      
  }
  data:any;
  async getData(id:any){
    const response = await this.api.getUserById(id)
    this.data = response;
    localStorage.setItem('user',this.data[0].Firstname);
    localStorage.setItem('img',this.data[0].image);
    this.img = localStorage.getItem('img');
    this.name = localStorage.getItem('user');

    
  }
logout() {
  localStorage.clear();
  this.route.navigate(['']);
}
async page(page: any) {
  let json= {
    page : page
  }
    this.users =  await this.api.userpage(json);
    console.log(this.users);
    
  }
}
