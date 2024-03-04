import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{
  constructor(private router:Router){

  }
  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.router.navigate(['/user']);
    }
  }
test() {
  this.router.navigate(['guess']);
}

}
