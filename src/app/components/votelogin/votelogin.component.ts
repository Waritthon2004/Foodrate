import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-votelogin',
  standalone: true,
  imports: [MatIconModule,RouterModule,RouterLink],
  templateUrl: './votelogin.component.html',
  styleUrl: './votelogin.component.scss'
})
export class VoteloginComponent implements OnInit {

  image: any;
  id : any;
  name : any;
  imgProfile:any;
  
  constructor(private api: ApiService,private route : Router) {
  }
  ngOnInit(): void {
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(new Date(), 'dd-MMM-YYYY')
    console.log(formattedDate);
    
    this.id = localStorage.getItem('id');
    this.getData(this.id);
    this.loadimage();
  }
  data : any;
  async getData(id:any){
    const response = await this.api.getUserById(id)
    this.data = response;
    localStorage.setItem('user',this.data[0].Firstname);
    localStorage.setItem('img',this.data[0].image);
    this.imgProfile = localStorage.getItem('img');
    this.name = localStorage.getItem('user');
    console.log(localStorage.getItem('user'));
    
  }
  async loadimage() {
    this.image = await this.api.getImage();
  }

  async Awin() {

    let json = {
      win: 1,
      PID1: this.image.pid1,
      PID2: this.image.pid2,
      point1: this.image.point1,
      point2: this.image.point2,
    };
    await this.api.putPoint(json);
    this.loadimage();
  }

  async Bwin() {
   
    let json = {
      win: 2,
      PID1: this.image.pid1,
      PID2: this.image.pid2,
      point1: this.image.point1,
      point2: this.image.point2,
    };

    await this.api.putPoint(json);
    this.loadimage();
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
  

}
