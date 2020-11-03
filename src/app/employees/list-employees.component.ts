import {Component, OnInit} from '@angular/core';
import {Employee} from '../models/employee.model';
import {EmployeeService} from './employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {temporaryAllocator} from '@angular/compiler/src/render3/view/util';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  allEmployees: Employee[];
  filteredEmployees: Employee[];
  public searchKey: FormControl = new FormControl();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchKey.setValue(this.route.snapshot.queryParamMap.get('searchTerm'));
    } else {
      this.employeeService.getEmployees().subscribe(
        response => {
          console.log(response);
          this.allEmployees = this.filteredEmployees = response as Employee[];
        },
        error => console.log(error)
      );
    }
    this.searchKey.valueChanges.subscribe(value => {
      this.filteredEmployees = value ? this.filterEmployees(value) : this.allEmployees;
    });
  }

  filterEmployees(searchString: string): Employee[] {
    return this.allEmployees.filter(employee => employee.name.toLowerCase().includes(searchString.toLowerCase()));
  }

  onDeleteNotification(id: number): void {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }

}


