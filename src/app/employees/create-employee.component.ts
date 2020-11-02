import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Department} from '../models/department.model';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { Employee} from '../models/employee.model';
import { EmployeeService} from './employee.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute ) {
    this.datePickerConfig = Object.assign({},
      {containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY'
      });
  }
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;
  dateOfBirth: Date = new Date(2018, 1, 30);
  datePickerConfig: Partial<BsDatepickerModule>;
  departments: Department[] = [
    {id: 1, name: 'Help Desk'},
    {id: 2, name: 'HR'},
    {id: 3, name: 'IT'},
    {id: 4, name: 'Payroll'},
    {id: 5, name: 'Admin'}
  ];



  employee: Employee ;

  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }
  // tslint:disable-next-line:typedef
   private getEmployee(id: number){
    if (id === 0){
      this.employee = {
        id: null,
        name: null,
        email: '',
        gender: null,
        dateOfBirth:  new Date(),
        phoneNumber: null,
        contactPreference: null,
        isActive: null,
        department: 'select',
        photoPath: null,
        password: null,
        confirmPassword: null
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    }else {
      this.panelTitle = 'Edit Employee';
      this.employee = Object.assign({}, this._employeeService.getEmployee(id));
    }

   }
  saveEmployee(): void{
    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }
  // tslint:disable-next-line:typedef
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
}
