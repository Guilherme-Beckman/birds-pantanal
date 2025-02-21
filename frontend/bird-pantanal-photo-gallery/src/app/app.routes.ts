import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateBirdComponent } from './pages/create-bird/create-bird.component';
import { UpdateBirdComponent } from './pages/update-bird/update-bird.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [ { path: 'login', component: LoginComponent},{ path: '', component: HomeComponent},{path: 'create', component: CreateBirdComponent, canActivate: [authGuard]}, 
    {path: 'update', component: UpdateBirdComponent, canActivate: [authGuard]}];
