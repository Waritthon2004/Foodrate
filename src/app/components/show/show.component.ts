import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit {


  data!: any;
  countdown: any;
  time : any;
  constructor(private api: ApiService,private dialogRef: MatDialogRef<ShowComponent>) {}

  ngOnInit(): void {
    this.load();
  }
 
  closeDialog(): void {
    this.dialogRef.close();
  }
  async load() {
    this.data = await this.api.getdelay();
    console.log(this.data);
  }
updatedelay(delay: any) {
  localStorage.setItem('Timedelay', delay.value);
}

}
