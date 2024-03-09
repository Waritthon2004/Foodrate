import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [MatIconModule,RouterLink],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})

export class StatisticComponent implements OnInit {
  name = localStorage.getItem('user');
  imgProfile = localStorage.getItem('img')

  data: any;
  constructor(private route:Router, private api : ApiService){
   
  }
  back() {
    window.history.back();
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }


  ngOnInit() {
    
    this.getData();
    
    
  }

  async getData() {
    this.data = await this.api.getchart();
    console.log(this.data);
    this.createChart();
  }
  
  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map((item: { Date: string }) => item.Date),
        datasets: [
          {
            label: 'Image',
            data: this.data.map((item: { point: number }) => item.point),
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  
}