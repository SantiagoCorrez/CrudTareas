import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasSessionGuard } from './Guards/has-session.guard';
import { LoginComponent } from './Pages/login/login.component';
import { TasksComponent } from './Pages/tasks/tasks.component';
import { UsersComponent } from './Pages/users/users.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"tareas",component:TasksComponent,canActivate:[HasSessionGuard]},
  {path:"users",component:UsersComponent,canActivate:[HasSessionGuard]},
  {path:"**",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
