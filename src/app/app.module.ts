import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { EmployeeService} from './employees/employee.service';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectRequiredValidatorDirective} from './shared/select-required-validator.directive';
import {ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService} from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import {EmployeeFilterPipe} from './employees/employee-filter.pipe';
import { PageNotFountComponent } from './page-not-fount.component';
import {EmployeeDetailsGuardService} from './employees/employee-details-guard.service';
import {HttpClientModule} from '@angular/common/http';


const appRoutes: Routes = [
  {path : 'list', component: ListEmployeesComponent},
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {path : 'employees/:id', component: EmployeeDetailsComponent, canDeactivate: [EmployeeDetailsGuardService]},
  {path: '', redirectTo : '/list', pathMatch: 'full'},
  {path : 'notfound', component: PageNotFountComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
