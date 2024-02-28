import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    {path:'',component:IndexComponent},
    {path:'regis',component:RegisterComponent},
    {path:'login',component:LoginComponent},
];
