import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoaddingComponent } from '../loadding/loadding.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle ,MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-standing-admin',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink,FormsModule,LoaddingComponent,MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,],
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
  constructor(private api : ApiService,private route:Router,private activedrout: ActivatedRoute,public dialog: MatDialog){

}

  imgProfile = localStorage.getItem('img');
  back() {
    window.history.back();
  }

  ngOnInit(): void {
    this.activedrout.queryParamMap.subscribe(params => {
      this.user = params.get('user');
    });
  
    
      this.loaddata(1);
  //  this.selectPrevious();
       
   
  }
  async loaddata(page: any) {
    this.data = [];
    this.pv = [];
    let dialogRef = this.dialog.open(LoaddingComponent, {
      width: '250px',
      height: '250px',
      data: { message: 'Loading...' }
    });
  
    let json = {
      page: page
    };
  
    try {
      // Perform API calls concurrently
      let [foods, count, prevDay] = await Promise.all([
        this.api.getFoodAll(),
        this.api.getFoodPage(json),
        this.api.getPerviousDay()
      ]);
  
      this.data = foods;
      let i = Math.ceil(this.data.length / 10);
      this.count = Array.from({ length: i }, (_, index) => index + 1);
  
      this.pv = prevDay;
      if (this.pv.length < 10) {
        this.pv.push(...Array.from({ length: 10 - this.pv.length }, () => ''));
      }
  
      console.log(this.data);
      console.log(this.count);
      console.log(this.pv);
    } catch (error) {
      console.error('Failed to load data:', error);
      // Handle error
    } finally {
      dialogRef.close();
    }
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
  

