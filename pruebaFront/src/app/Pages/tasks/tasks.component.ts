import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/Models/task.model';
import { User } from 'src/app/Models/user.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TaskComponent } from 'src/app/Shareds/Modals/task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress','fecha','actions'];
  dataSource!: MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service:ServiciosService,private dialog:MatDialog) { }
  tasks!:Task[];
  ngOnInit(): void {
    let idUser = parseInt(sessionStorage.getItem("user")!)
    this.getTask(idUser)
  }
  getTask(idUser:number){
    this.service.tasks().subscribe({
      next:(data:Task[])=>{
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
    let dialogAdd = this.dialog.open(TaskComponent)
    dialogAdd.afterClosed().toPromise().then(res=>{
      console.log(res)
      
      let idUser = parseInt(sessionStorage.getItem("user")!)
      this.getTask(idUser)
    })
  }
  editar(data:any){
    let dialogAdd = this.dialog.open(TaskComponent,{
      data:data
    })
    dialogAdd.afterClosed().toPromise().then(res=>{
      console.log(res)
      
      let idUser = parseInt(sessionStorage.getItem("user")!)
      this.getTask(idUser)
    })
  }
}
