import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit{
  //biến để check bộ đếm thời gian
  private timeoutID: any;

  constructor(
    private router: Router,
    private location: Location
  ) {}

  goBack(): void {
    //Nếu nhấn button quay lại trang ngay thì mình clear thời gian chờ 3s để tránh nhảy 2 lần
    clearTimeout(this.timeoutID);
    this.location.back();
  }

  ngOnInit(): void {
    this.timeoutID = setTimeout(() => {
      this.location.back()
    }, 2000);
  }

}
