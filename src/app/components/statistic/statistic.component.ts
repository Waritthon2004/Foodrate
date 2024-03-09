import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [MatIconModule,RouterLink],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {
  name = localStorage.getItem('user');
imgProfile = localStorage.getItem('img')
  constructor(private route:Router){}
  back() {
    window.history.back();
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
}
