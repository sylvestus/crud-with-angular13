import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogueComponent } from './dialogue/dialogue.component';
import { ApiService } from './services/api.service';

import { ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


 

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'angular v13 crud opererations';

  displayedColumns: string[] = ['productName','category','seasons','price','comment','date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ApiService){}
  ngOnInit(): void {
    this.getAllDAta()
  }

openDialog() {
    this.dialog.open(DialogueComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllDAta()
      }
    });
  }

getAllDAta(){
  return this.api.getProduct().subscribe({
    next:(res)=>{
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort=this.sort
    },
    error:(err)=>{
      alert('error while fetching data')
    }
  })
}

editProduct(row:any){
  this.dialog.open(DialogueComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllDAta()
    }
  });
}

deleteProduct(id:number){
  return this.api.deleteProduct(id).subscribe({
    next:(res)=>{
      alert("product deleted successfully")
      this.getAllDAta()
    },
    error:()=>{
      alert('erroradding product')
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
