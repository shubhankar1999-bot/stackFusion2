import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { ConfigService, Data } from '../services/config.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.css']
})
export class FormResultComponent implements OnInit,AfterViewInit {
  rawData:Data[]=[]
  displayedColumns: string[] = ['id','name', 'email', 'dateOfBirth', 'phone'];
  dataSource!:MatTableDataSource<Data>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private http: HttpClient) { }
  ngAfterViewInit(): void {
    this.http.get<any>('https://shubh123.pythonanywhere.com').subscribe(data => {
      console.log(data.payload)
      this.rawData=data
      this.dataSource=new MatTableDataSource(data.payload)
      this.dataSource.paginator = this.paginator;
  })
  }

  ngOnInit(): void {
    this.http.get<any>('https://shubh123.pythonanywhere.com').subscribe(data => {
      console.log(data.payload)
      this.rawData=data
      this.dataSource=new MatTableDataSource(data.payload)
      this.dataSource.paginator = this.paginator;
  })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
