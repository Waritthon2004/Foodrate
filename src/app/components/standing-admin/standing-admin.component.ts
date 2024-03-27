import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-standing-admin',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink,FormsModule],
  templateUrl: './standing-admin.component.html',
  styleUrl: './standing-admin.component.scss'
})
export class StandingAdminComponent implements OnInit{


  name = localStorage.getItem('user');
  img = localStorage.getItem('img');
  data : any;
  pv : any;
  user!:any;
  count:any;
  constructor(private api : ApiService,private route:Router,private activedrout: ActivatedRoute){

}

  imgProfile = localStorage.getItem('img');
  back() {
    window.history.back();
  }

  ngOnInit(): void {
    let  x   = localStorage.getItem('type')||2;
    if(x  == 0){
      this.route.navigate(['/user']);
    }
    this.activedrout.queryParamMap.subscribe(params => {
      this.user = params.get('user');
    });
  
    
      this.loaddata(1);
  //  this.selectPrevious();
       
   
  }

  async loaddata(page : any){
    this.data = [];
    this.pv = [];

    let json= {
      page : page
    }
    this.data = await this.api.getFoodAll();
    this.count = [];
    let i = Math.ceil(this.data.length / 10);
    for(let j = 1; j<=i;j++){
      this.count.push(j);
    }
    console.log(this.count);
    

    this.data =  await this.api.getFoodPage(json);
    console.log(this.data);
    console.log('count',this.count);
    

    let result = await this.api.getPerviousDay();
    this.pv = result;
    if(this.pv.length != 10){
      for(let i = this.pv.length; i < 10; i++){
        this.pv.push("");
      }
    }
    console.log(this.data); 
    console.log(this.pv);
    
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
 //
  check(PID:any){
     for (let index = 0; index < this.pv.length; index++) {
      if(this.pv[index].PID == PID){
        return this.pv[index].rank;
      }
    }

  }
  grap(idx: any) {
    console.log(idx);
    
    this.route.navigate(['/statistic'], { queryParams: { id: idx } });
}
async page(page: any) {
  let json= {
    page : page
  }
    this.data =  await this.api.getFoodPage(json);
    console.log(this.data);
    
  }
}
  

