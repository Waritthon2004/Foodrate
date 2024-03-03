import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-votenologin',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './votenologin.component.html',
  styleUrl: './votenologin.component.scss',
})
export class VotenologinComponent implements OnInit {
  image: any;
  constructor(private api: ApiService) {
  }
  ngOnInit(): void {
    this.loadimage();
  }
  async loadimage() {
    this.image = await this.api.getImage();
    console.log(this.image);
    
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
