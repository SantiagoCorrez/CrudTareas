import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/Models/empleado.model';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formEmpleado:FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder,private service:ServiciosService,private dialog:MatDialogRef<UserComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    if(data==null){
      this.formEmpleado = this.fb.group({
        name:new FormControl('',[Validators.required]),
        area:new FormControl('',[Validators.required]),
      })
    }else{
      this.formEmpleado = this.fb.group({
        name:new FormControl(data.name,[Validators.required]),
        area:new FormControl(data.area,[Validators.required])
      })
    }
    
  }

  ngOnInit(): void {
  }
  guardar(){
    if(this.formEmpleado.valid){
      let data:Empleado = this.formEmpleado.value
      if(this.data==null){
        this.service.createEmpleado(data).subscribe({
          next:(data:Response)=>{
            this.dialog.close(data)
          }
        })
      }else{
        this.service.updateEmpleado(data,this.data.id).subscribe({
          next:(data:Response)=>{
            this.dialog.close(data)
          }
        })
      }
      
    }else{
      this.formEmpleado.markAllAsTouched()
    }
  }
}
