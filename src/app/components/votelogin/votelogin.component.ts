import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';

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
  constructor(private api: ApiService) {
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
      win: 0,
      PID1: this.image.pid1,
      PID2: this.image.pid2,
      point1: this.image.point1,
      point2: this.image.point2,
    };

    await this.api.putPoint(json);
    this.loadimage();
  }
}
