import { Component, OnInit } from '@angular/core';
import {Employee} from '../models/employee.model';
import {EmployeeService} from './employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Observable<Employee[]> ;
  filteredEmployees: Employee[];
  // tslint:disable-next-line:variable-name
  private _searchTerm: string;
  get searchTerm(): string{
    return this._searchTerm;
  }
  set searchTerm(value){
       this._searchTerm = value;
       this.filteredEmployees = this.filterEmployees(value);
  }
  // tslint:disable-next-line:typedef
  filterEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  // tslint:disable-next-line:variable-name
  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) { }

  // tslint:disable-next-line:typedef
  onDeleteNotification(id: number){
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1){
      this.filteredEmployees.splice(i, 1);
    }

  }

  ngOnInit(): void {
    this.employees = this._employeeService.getEmployees();
    if (this._route.snapshot.queryParamMap.has('searchTerm')){
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    }else {
      this.filteredEmployees = this.employees;
    }
    /*console.log(this._route.snapshot.queryParamMap.has('searchTerm'));
    console.log(this._route.snapshot.queryParamMap.get('searchTerm'));
    console.log(this._route.snapshot.queryParamMap.getAll('searchTerm'));
    console.log(this._route.snapshot.queryParamMap.keys);
    console.log(this._route.snapshot.paramMap.keys);*/
  }
}


