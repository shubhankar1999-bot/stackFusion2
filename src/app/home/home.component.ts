import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService, Data } from '../services/config.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userForm!: FormGroup;
  dateOfBirth: any=''
  minDate = new Date(Date.now());
  maxDate = new Date(Date.now());
  // rawData:Data[]=[]
  // displayedColumns: string[] = ['id','name', 'email', 'dateOfBirth', 'phone'];
  // dataSource!:MatTableDataSource<Data>;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  constructor(public formBuilder: FormBuilder,public service:ConfigService,private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10)]],
    })
    this.minDate.setDate( this.minDate.getDate() );
this.minDate.setFullYear( this.minDate.getFullYear() - 100 );

// setting the calendar's start date and youngest birth dates for > 18 years old
this.maxDate.setDate( this.maxDate.getDate() );
this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );
  //   this.http.get<any>('https://shubh123.pythonanywhere.com').subscribe(data => {
  //     console.log(data.payload)
  //     this.rawData=data
  //     this.dataSource=new MatTableDataSource(data.payload)
  //     this.dataSource.paginator = this.paginator;
  // })
  }
  onSubmit(){
    console.log(this.userForm.value)
    console.log(this.dateOfBirth)
    if((this.userForm.get('name')?.value !='') && (this.userForm.get('phone')?.value !='') && (this.userForm.get('email')?.value !='') && this.dateOfBirth!=''){
      if(((this.userForm.get('phone')?.value).length==10)){
        const x={"name":this.userForm.get('name')?.value,"email":this.userForm.get('email')?.value,"phone":parseInt(this.userForm.get('phone')?.value),"dateOfBirth":this.dateOfBirth}
        this.service.addData(x)
        this.router.navigate(['view-data'])
      }
      else{
        this.userForm.patchValue({"phone":""})
        alert('Mobile Number Should be of 10 digits only')
      }
     }
     else{
      alert('Please Enter all the Values')
     }
  }
  OnDateChange(event:any){
    this.dateOfBirth=event
    var month = this.dateOfBirth.getMonth()+1;
if (month < 10) month = "0" + month;
var dateOfMonth = this.dateOfBirth.getDate();
if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
var year = this.dateOfBirth.getFullYear();
var formattedDate = dateOfMonth + "/" + month + "/" + year;
var newdate = formattedDate.split("/").reverse().join("-");
this.dateOfBirth=newdate
  }


}
