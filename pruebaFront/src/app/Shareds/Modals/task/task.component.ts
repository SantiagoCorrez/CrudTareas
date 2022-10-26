import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/Models/empleado.model';
import { Response } from 'src/app/Models/response.model';
import { Task } from 'src/app/Models/task.model';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  formTask:FormGroup = new FormGroup({});
  empleados!: Empleado[];
  constructor(private fb:FormBuilder,private service:ServiciosService,private dialog:MatDialogRef<TaskComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    if(data==null){
      this.formTask = this.fb.group({
        task:new FormControl('',[Validators.required]),
        fecha:new FormControl('',[Validators.required]),
        status:new FormControl('',[Validators.required]),
        idUser:new FormControl('',[Validators.required]),
      })
    }else{
      this.formTask = this.fb.group({
        task:new FormControl(data.task,[Validators.required]),
        fecha:new FormControl(new Date(data.fecha).toJSON().split("T")[0],[Validators.required]),
        status:new FormControl(data.status,[Validators.required]),
        idUser:new FormControl(data.user.id,[Validators.required]),
      })
    }
    
  }

  ngOnInit(): void {
    this.service.empleados().subscribe({
      next:(data:Empleado[])=>{
        this.empleados=(data)
      }
    })
  }
  guardar(){
    if(this.formTask.valid){
      let data:Task = this.formTask.value
      data.fecha = new Date(data.fecha).toJSON()
      if(this.data==null){
        this.service.createTask(data).subscribe({
          next:(data:Response)=>{
            this.dialog.close(data)
          }
        })
      }else{
        this.service.updateTask(data,this.data.id).subscribe({
          next:(data:Response)=>{
            this.dialog.close(data)
          }
        })
      }
      
    }else{
      this.formTask.markAllAsTouched()
    }
  }
}
