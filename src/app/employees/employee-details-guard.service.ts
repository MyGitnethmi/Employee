import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {EmployeeService} from './employee.service';
import {Injectable} from '@angular/core';

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {
  // tslint:disable-next-line:variable-name
  constructor(private _employeeService: EmployeeService, private _router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   const employeeExists = !!this._employeeService.getEmployee(+route.paramMap.get('id'));

   if (employeeExists){
     return true;
   }else {
     this._router.navigate(['notfound']);
     return false;
   }
  }

}
