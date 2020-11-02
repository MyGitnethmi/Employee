import { Injectable} from '@angular/core';
import {Employee} from '../models/employee.model';
import {Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';


@Injectable()
export class EmployeeService{
  constructor(private httpClient: HttpClient ) {
  }
     private listEmployees: Employee[] = [
       {
         id: 1,
         name: 'Mary',
         gender: 'Female',
         email: 'agsdu@gmail.com',
         contactPreference: 'Email',
         dateOfBirth: new Date('10/25/1988'),
         department: '1',
         isActive: true,
         photoPath: 'assets/images/image-placeholder-title.jpg',
         password: '1234',
         confirmPassword: '1234'
       },
       {
         id: 2,
         name: 'Mark',
         gender: 'Male',
         phoneNumber: 2345978640,
         contactPreference: 'Phone',
         dateOfBirth: new Date('10/25/1986'),
         department: '3',
         isActive: true,
         photoPath: 'assets/images/images.jpg',
         password: '1234',
         confirmPassword: '1234'
       },
       {
         id: 3,
         name: 'John',
         gender: 'Male',
         phoneNumber: 5445978640,
         contactPreference: 'Phone',
         dateOfBirth: new Date('11/09/1979'),
         department: '4',
         isActive: false,
         photoPath: 'assets/images/images (1).jpg',
         password: '1234',
         confirmPassword: '1234'
       }
     ];
  getEmployees(): Observable<Employee[]> {
         return this.httpClient.get<Employee[]>('http://localhost:3000/employees');
     }
     getEmployee(id: number): Employee {
       return this.listEmployees.find(e => e.id === id);
    }
  // tslint:disable-next-line:typedef
     save(employee: Employee){
       if (employee.id === null) {
         // tslint:disable-next-line:only-arrow-functions typedef
     const maxid = this.listEmployees.reduce(function(e1, e2){
           return (e1.id > e2.id) ? e1 : e2;
         }).id;
     employee.id = maxid + 1;
     this.listEmployees.push(employee);
       }else {
        const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
        this.listEmployees[foundIndex] = employee;
       }
     }
  // tslint:disable-next-line:typedef
     deleteEmployee(id: number){
      const i = this.listEmployees.findIndex(e => e.id === id);
      if (i !== -1){
         this.listEmployees.splice(i, 1);
       }
     }

}
