import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { LoaddingComponent } from '../loadding/loadding.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,LoaddingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  bool: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService,private route:Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      Email: [''],
      Password: [''],
    });
  }

  async submitForm() {
    const formData = this.myForm.value;
    await this.Checklogin(formData);
  
  }

  async Checklogin(jsonData: any) {
    let dialogRef = this.dialog.open(LoaddingComponent, {
      width: '250px',
      height: '250px',
      data: { message: 'Loading...' }
    });
    this.bool = await this.api.checkLogin(jsonData);
    if(this.bool){
      dialogRef.close();
    }
    console.log(typeof this.bool.UID);
    
    if(typeof this.bool.UID === 'number'){
        localStorage.setItem('id',this.bool.UID);
        localStorage.setItem('type',this.bool.type)
        
        if( this.bool.type == "1" ){
          this.route.navigate(['/admin'])
          console.log(this.bool.type);

        }
        else if(this.bool.type == 0){
        localStorage.setItem('Timedelay', '10');
        this.route.navigate(['/user'])
        }
    }
    else{
      console.log("wrong");
      
    }
  }
 
}
