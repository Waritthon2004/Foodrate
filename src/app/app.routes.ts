import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { VotenologinComponent } from './components/votenologin/votenologin.component';
import { StandingComponent } from './components/standing/standing.component';
import { VoteloginComponent } from './components/votelogin/votelogin.component';
import { UploadComponent } from './components/upload/upload.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { AllUserComponent } from './components/all-user/all-user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { StandingAdminComponent } from './components/standing-admin/standing-admin.component';
import { EditadminComponent } from './components/editadmin/editadmin.component';
import { InfomationComponent } from './components/infomation/infomation.component';


export const routes: Routes = [
    {path:'',component:IndexComponent},
    {path:'regis',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'guess',component:VotenologinComponent},
    {path:'standing',component:StandingComponent},
    {path:'user',component:VoteloginComponent},
    {path:'upload',component:UploadComponent},
    {path:'profile',component:MyProfileComponent},
    {path:'admin',component:AllUserComponent},
    {path:'statistic',component:StatisticComponent},
    {path:'userProfile/:id',component:UserProfileComponent},
    {path:'standingAdmin',component:StandingAdminComponent},
    {path:'editadmin',component:EditadminComponent},
    {path:'info/:uid',component:InfomationComponent},
];
