import { ApiService } from './../../services/data/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  studentData: any;
  constructor(private api:ApiService) {

    this.studentData = [];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // Used ionViewWillEnter because ngOnInit is not called due to view persistence in Ionic
    this.getAllStudent();
  }

  getAllStudent(){
    this.api.getList().subscribe(response =>{
      console.log(response);
      this.studentData = response;
    });
  }

  delete(item){
    this.api.deleteItem(item.id).subscribe(response => {
      // after delete you should update the list so
      this.getAllStudent();
    });
  }
}
