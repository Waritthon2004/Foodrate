import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { routes } from '../../app.routes';

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
  constructor(private api: ApiService,private route : Router) {
  }
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    console.log(this.id);
    
    this.loadimage();
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
