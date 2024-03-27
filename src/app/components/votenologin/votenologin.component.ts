import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { LoaddingComponent } from '../loadding/loadding.component';

@Component({
  selector: 'app-votenologin',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    RouterLink,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    DialogComponent,
    LoaddingComponent,
  ],
  templateUrl: './votenologin.component.html',
  styleUrl: './votenologin.component.scss',
})
export class VotenologinComponent implements OnInit {
  image: any;
  json : any;
  constructor(private api: ApiService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadImageWithPopup();
  }
  async loadImageWithPopup() {
    let dialogRef = this.dialog.open(LoaddingComponent, {
      width: '250px',
      height: '250px',
      data: { message: 'Loading...' }
    });
  
    try {
      this.image = await this.api.getImage();
    } catch (error) {
      console.error('Failed to load image:', error);
      // Handle error (e.g., show error message)
    } finally {
        dialogRef.close();
    }
  }
  async Awin() {
    let json = {
      win: 1,
      URL1: this.image.image1,
      URL2: this.image.image2,
      PID1: this.image.pid1,
      PID2: this.image.pid2,
      point1: this.image.point1,
      point2: this.image.point2,
    };
    this.api.json = json;
    this.api.cal = await this.api.putPoint(json);
  
    this.dialog.open(DialogComponent);
  }

  async Bwin() {
    let json = {
      win: 2,
      URL1: this.image.image1,
      URL2: this.image.image2,
      PID1: this.image.pid1,
      PID2: this.image.pid2,
      point1: this.image.point1,
      point2: this.image.point2,
    };
    console.log(json);
    this.api.json = json;
    this.api.cal = await this.api.putPoint(json);
    this.dialog.open(DialogComponent);
  }

  async open(i: number) {
    if (i == 1) {
       this.Awin();
    }
    if (i == 2) {
      this.Bwin();
    }
   
    this.loadImageWithPopup();
  }
}
