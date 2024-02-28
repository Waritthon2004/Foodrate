import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-votenologin',
  standalone: true,
  imports: [MatIconModule,RouterModule],
  templateUrl: './votenologin.component.html',
  styleUrl: './votenologin.component.scss'
})
export class VotenologinComponent {

}
