import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

export interface Data {
  name : string;
  dateOfBirth : string;
  email:string;
  phone:number
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  addData(data:any){
    this.http.post<any>('https://shubh123.pythonanywhere.com/post_form/', data)
    .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
        console.error('There was an error!', error.message);

        // after handling error, return a new observable 
        // that doesn't emit any values and completes
        return of();
    }))
    .subscribe(data => {
        console.log(data)
    });
  }

}
