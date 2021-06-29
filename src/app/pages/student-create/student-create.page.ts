import { Student } from './../../models/student';
import { ApiService } from './../../services/data/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.page.html',
  styleUrls: ['./student-create.page.scss'],
})
export class StudentCreatePage implements OnInit {
  data: Student;
  constructor(private api: ApiService,
    public router: Router) 
    {
      this.data = new Student();
    }

  ngOnInit() {
  }
  submitForm() {
    this.api.createItem(this.data).subscribe((response) => {
      this.router.navigate(['student-list']);
    });
  }
}
