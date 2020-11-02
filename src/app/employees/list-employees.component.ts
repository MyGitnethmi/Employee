import {Component, OnInit} from '@angular/core';
import {Employee} from '../models/employee.model';
import {EmployeeService} from './employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Observable<Employee[]>;
  filteredEmployees: Employee[];
  private _searchTerm: string;

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.employees = this._employeeService.getEmployees();
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.employees.subscribe(employees => {
        this.filteredEmployees = employees as Employee[];
      });
    }
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  filterEmployees(searchString: string): Employee[] | undefined {
    let temp: Employee[];
    this.employees.subscribe(employees => {
      temp = employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
    });
    return temp ? temp : [];
  }

  onDeleteNotification(id: number): void {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }

  }

}


