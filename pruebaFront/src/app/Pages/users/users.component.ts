import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/Models/empleado.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UserComponent } from 'src/app/Shareds/Modals/user/user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'area','actions'];
  dataSource!: MatTableDataSource<Empleado>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service:ServiciosService,private dialog:MatDialog) { }
  tasks!:Empleado[];
  ngOnInit(): void {
    let idUser = parseInt(sessionStorage.getItem("user")!)
    this.getTask(idUser)
  }
  getTask(idUser:number){
    this.service.empleados().subscribe({
      next:(data:Empleado[])=>{
        this.tasks=(data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  add(){
    let dialogAdd = this.dialog.open(UserComponent)
    dialogAdd.afterClosed().toPromise().then(res=>{
      console.log(res)
      
      let idUser = parseInt(sessionStorage.getItem("user")!)
      this.getTask(idUser)
    })
  }
  editar(data:any){
    let dialogAdd = this.dialog.open(UserComponent,{
      data:data
    })
    dialogAdd.afterClosed().toPromise().then(res=>{
      console.log(res)
      
      let idUser = parseInt(sessionStorage.getItem("user")!)
      this.getTask(idUser)
    })
  }
}
