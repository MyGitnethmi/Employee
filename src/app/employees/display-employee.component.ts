import {Component, Input, OnInit, Output, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import {Employee} from '../models/employee.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit{
   selectedEmployeeId: number;
   @Input() employee: Employee;
   @Input() searchTerm: string;
   @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
   confirmDelete = false;
   isHidden = false;
  // tslint:disable-next-line:variable-name
  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }
  // tslint:disable-next-line:typedef
  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { searchTerm: this.searchTerm }
    });
  }
  // tslint:disable-next-line:typedef
   editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }
  // tslint:disable-next-line:typedef
  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }
}
