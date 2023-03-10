import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDataService } from '../service/data/employee-data.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../list-employees/list-employees.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  id!: string
  employee: Employee = {
    id: '',
    name: '',
    login: '',
    salary: 0
  }

  constructor(
    private employeeService: EmployeeDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    // this.employee = new Employee(this.id,,false,new Date());

    if(this.id!='-1') {
      this.employeeService.retrieveEmployee(this.id)
          .subscribe (
            data => this.employee = data
          )
    }
  }

  saveEmployee() {
    if(this.id == '-1') { //=== ==
      console.log(this.employee);
      this.employeeService.createEmployee(this.id, this.employee)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['employees'])
            }
          )
    } else {
      this.employeeService.updateEmployee(this.id, this.employee)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['employees'])
            }
          )
    }
  }

}
