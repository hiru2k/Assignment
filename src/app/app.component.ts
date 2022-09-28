import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UserManagement';


  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'password','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;






  constructor(private dialog: MatDialog, private api:ApiService){

  }
  ngOnInit(): void {
   this.getAllUsers();
  }
  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val==='save'){
      this.getAllUsers()
    }
  })
  }

  getAllUsers(){
    this.api.getUser()
    .subscribe({
      next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error")
      }
    })
  }

editUser(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllUsers();
    }
  })
}


deleteUser(id:number){
  this.api.deleteUser(id)
  .subscribe({
    next:(res)=>{
      alert("User Deleted Successfully")
      this.getAllUsers();
    },
    error:()=>{
      alert("Error While Deleting")
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
}
