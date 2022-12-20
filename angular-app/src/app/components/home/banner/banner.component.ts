import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { UserService } from 'src/app/shared/auth/user.service';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  //user array
  user: any[] = [];
  // trainer array
  trainer: any[] = [];

  constructor(
    private userService: UserService,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.getTrainers();
    this.getUsers();
    this.counter();
  }

  //get all users
  async getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        if (res.success) {
          this.user = res.data;
        }
      },
      error: (err) => {},
      complete: () => {
        this.hideSpinner();
      },
    });
  }

  //get all trainers
  getTrainers() {
    this.trainerService.getAllTrainers().subscribe({
      next: (res) => {
        if (res.success) {
          this.trainer = res.data;
        }
      },
      error: (err) => {},
      complete: () => {
        this.hideSpinner();
      },
    });
  }

  // jquery for counter
  counter() {
    $('.count').each(function () {
      $(this)
        .prop('Counter', 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          }
        );
    });
  }

  //hide loading spinner
  hideSpinner() {
    $('#loading').css('display', 'none');
    $('.spinner').remove();
  }
}
