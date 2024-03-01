import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-votenologin',
  standalone: true,
  imports: [MatIconModule,RouterModule],
  templateUrl: './votenologin.component.html',
  styleUrl: './votenologin.component.scss'
})
export class VotenologinComponent implements OnInit {
  image : any;
  image1 : any;
  image2 : any;
  constructor(private api : ApiService){}

  ngOnInit(): void {
    this.loadimage();
  }
  async loadimage() {
     this.image = await this.api.getImage();
     this.image1 = this.image.image1;
     this.image2 = this.image.image2;
  }

}
