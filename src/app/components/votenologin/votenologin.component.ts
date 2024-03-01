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

  K = 30;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadimage();
  }
  async loadimage() {
    this.image = await this.api.getImage();
  }

  // Ra and Rb are current ELO ratings

  // Function to calculate the Probability
  Probability(rating1: number, rating2: number): number {
    return (
      (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rating1 - rating2)) / 400))
    );
  }

  // Function to calculate Elo rating
  // K is a constant.
  // d determines whether Player A wins
  // or Player B.
  EloRating(Ra: number, Rb: number, K: number, d: boolean): void {
    // To calculate the Winning
    // Probability of Player B
    let Pb = this.Probability(Ra, Rb);

    // To calculate the Winning
    // Probability of Player A
    let Pa = this.Probability(Rb, Ra);

    // Case 1 When Player A wins
    // Updating the Elo Ratings
    if (d === true) {
      this.image.point1 = Ra + K * (1 - Pa);
      this.image.point2 = Rb + K * (0 - Pb);
    
      
    }

    // Case 2 When Player B wins
    // Updating the Elo Ratings
    else {
      this.image.point1 = Ra + K * (0 - Pa);
      this.image.point2 = Rb + K * (1 - Pb);
    }

    console.log('Updated Ratings:-');
    console.log(
      'Ra = ' +
        Math.round(this.image.point1 * 1000000.0) / 1000000.0 +
        ' Rb = ' +
        Math.round(this.image.point2 * 1000000.0) / 1000000.0
    );
  }

  async Awin() {
    let d: boolean = true;
    try{
      await this.EloRating(this.image.point1, this.image.point2, this.K, d);
      let json = {
          PID1: this.image.pid1,
          PID2: this.image.pid2,
          point1: this.image.point1,
          point2: this.image.point2
      };
      await this.api.putPoint(json);
      this.loadimage();
    }
    catch{
      console.log("Error");
      
    }
}


  async Bwin() {
    let d: boolean = false;
    try{
      await this.EloRating(this.image.point1, this.image.point2, this.K, d);
      let json = {
        PID1: this.image.pid1,
        PID2: this.image.pid2,
        point1: this.image.point1,
        point2: this.image.point2
      };

      
      await this.api.putPoint(json);
      this.loadimage();
    }
  catch{
    console.log("Error");
    
  }
  }
}
