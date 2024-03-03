import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { VotenologinComponent } from './components/votenologin/votenologin.component';
import { StandingComponent } from './components/standing/standing.component';
import { VoteloginComponent } from './components/votelogin/votelogin.component';
import { UploadComponent } from './components/upload/upload.component';


export const routes: Routes = [
    {path:'',component:IndexComponent},
    {path:'regis',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'guess',component:VotenologinComponent},
    {path:'standing',component:StandingComponent},
    {path:'user',component:VoteloginComponent},
    {path:'upload',component:UploadComponent}
];
