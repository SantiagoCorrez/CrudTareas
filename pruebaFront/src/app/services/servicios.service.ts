import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../Models/empleado.model';
import { Login } from '../Models/login.model';
import { Task } from '../Models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  link = environment.linkBack
  constructor(private client:HttpClient) { }
  
  login(datos:Login):Observable<any>{
    return this.client.post(this.link+"/login",datos)
  }
  tasks():Observable<any>{
    return this.client.get(this.link+"/task")
  }
  tasksByUser(id:number):Observable<any>{
    return this.client.get(this.link+"/task/"+id)
  }
  createTask(task:Task):Observable<any>{
    return this.client.post(this.link+"/task/new",task)
  }
  updateTask(task:Task,id:number):Observable<any>{
    return this.client.post(this.link+"/task/update/"+id,task)
  }
  empleados():Observable<any>{
    return this.client.get(this.link+"/empleado")
  }
  createEmpleado(task:Empleado):Observable<any>{
    return this.client.post(this.link+"/empleado/new",task)
  }
  updateEmpleado(task:Empleado,id:number):Observable<any>{
    return this.client.post(this.link+"/empleado/update/"+id,task)
  }
}
