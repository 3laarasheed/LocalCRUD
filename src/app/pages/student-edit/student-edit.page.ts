import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { ApiService } from '../../services/data/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.page.html',
  styleUrls: ['./student-edit.page.scss'],
})
export class StudentEditPage implements OnInit {
  
  id: number;
  data: Student;

  constructor(private api: ApiService,
    public router: Router,
    public activeRoute: ActivatedRoute ) {

    this.data = new Student();
  }

  ngOnInit() {
    // i already sent item id from list page so if i used activatedRoute it could reach it
    this.id = this.activeRoute.snapshot.params['id'];
    // now we need this item details
    this.api.getItem(this.id).subscribe(response => {
      this.data = response;
    });
  }

  update(){
    this.api.updateItem(this.id,this.data).subscribe(response => {
      this.router.navigate(['student-list']);
    });
  }
}
