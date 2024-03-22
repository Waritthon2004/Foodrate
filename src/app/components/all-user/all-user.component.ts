import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink],
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.scss'
})
export class AllUserComponent implements OnInit{

  img : any;
  users : any;
  i : any;
  user : any;
  totalItems:number = 0;
  constructor(private route:Router,private api:ApiService){}
  ngOnInit(): void {
    this.img = localStorage.getItem('img');
    this.load();
  }
  async load (){
    this.users = await this.api.getUser();
    console.log(this.users);
    this.i = 0;
  }

 
logout() {
}
next(id:any) {
  this.route.navigate(['/userProfile', id]);
  }
}
