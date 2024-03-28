import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infomation',
  standalone: true,
  imports: [MatIcon,CommonModule,RouterLink],
  templateUrl: './infomation.component.html',
  styleUrl: './infomation.component.scss'
})
export class InfomationComponent {


  id : any;
  data : any;
  datas : any;
  img :any;
  imgUser :any;
  name : any;
  imgProfile = localStorage.getItem('img');
  constructor(private route : Router,private api:ApiService,private activedroute : ActivatedRoute ){}
  ngOnInit(): void {
    let  x   = localStorage.getItem('type')||2;
    if(x  == 1){
      this.route.navigate(['/admin']);
    }
    else if(x == 2){
      this.route.navigate(['']);

    }
    this.activedroute.params.subscribe(params=>{
      this.id = params['uid'];
    })
    
    this.name = localStorage.getItem('user')
    this.imgUser = localStorage.getItem('img');

   this.getData();
   this.selectIMG();
  }

  back() {
    window.history.back();
  } 
  async getData(){
    this.datas = [];
    const response = await this.api.getUserById(this.id);
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
