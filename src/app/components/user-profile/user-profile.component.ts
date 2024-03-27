import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  id : any;
  data : any;
  datas : any;
  img :any;
  imgUser :any;
  name : any;

  constructor(private route : Router,private api:ApiService,private activedroute : ActivatedRoute ){}
  ngOnInit(): void {
    let  x   = localStorage.getItem('type')||2;
    if(x  == 0){
      this.route.navigate(['/user']);
    }
    else if(x == 2){
      this.route.navigate(['']);

    }
    this.name = localStorage.getItem('user')
    this.imgUser = localStorage.getItem('img');
    this.activedroute.params.subscribe(params=>{
      this.id = params['id'];
    })
   this.getData();
   this.selectIMG();
  }

  back() {
    window.history.back();
  } 
  async getData(){
    this.datas = [];
    const response = await this.api.getUserById(this.id)
    this.data = response;
   
    
  }
  async selectIMG(){
    const response = await this.api.getImageById(this.id);
    this.img = response; 
    console.log(this.img);
    
  //   if(this.img.length != 5){
  //     for(let i = this.img.length;i!=5;i++){
  //       this.img.push({url: null});
  //   }
  // }

}
logout(){
  localStorage.clear();
  this.route.navigate(['']);
}
}
