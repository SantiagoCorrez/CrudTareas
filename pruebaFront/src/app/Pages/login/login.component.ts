import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/login.model';
import { Response } from 'src/app/Models/response.model';
import { User } from 'src/app/Models/user.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
import {Md5} from 'ts-md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder,private service:ServiciosService,private router:Router) {
    this.formLogin = this.fb.group({
      user:new FormControl('',[Validators.required]),
      pass:new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
    
  }
  login(){
    if(this.formLogin.valid){
      let formValue:Login = this.formLogin.value
      formValue.pass=Md5.hashStr(formValue.pass)
      this.service.login(formValue).subscribe({
        next:(data:Response)=>{
          if(data.status!="Error"){
            sessionStorage.setItem("user",data.message)
            this.router.navigate(['tareas'])
          }else{
            Swal.fire('Ha ocurrido un error','Por favor verifica los datos ingresados','error')
          }
        }
      })
    }else{
      this.formLogin.markAllAsTouched()
    }
  }
}
