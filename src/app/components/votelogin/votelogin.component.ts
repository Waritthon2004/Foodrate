import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-votelogin',
  standalone: true,
  imports: [MatIconModule,RouterModule],
  templateUrl: './votelogin.component.html',
  styleUrl: './votelogin.component.scss'
})
export class VoteloginComponent {

}
