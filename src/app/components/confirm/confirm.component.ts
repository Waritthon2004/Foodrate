import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AnimeComponent } from '../anime/anime.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatIcon,MatButtonModule,AnimeComponent],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmComponent>,public dialog: MatDialog) { }
  onNoClick(): void {
  
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    let dialogRef = this.dialog.open(AnimeComponent, {
      width: '250px',
      height: '250px',
      data: { message: 'Loading...' }
    });
    setTimeout(() => {
      dialogRef.close();  
    }, 250);
    this.dialogRef.close(true);
  }
}
