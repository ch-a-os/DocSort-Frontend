import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuardService } from './guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [GuardService] }
]