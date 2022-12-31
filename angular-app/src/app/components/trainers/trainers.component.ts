import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';
import { UserService } from 'src/app/shared/auth/user.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
})
export class TrainersComponent implements OnInit {
  //users
  trainers: any[] = [];
  trainees: any[] = [];
  loggedUserId: any;

  // messages
  showSuccessMsg!: boolean;
  showErrorsMsg!: boolean;
  errorMsg!: String;
  successMsg!: string;

  constructor(
    private trainerService: TrainerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getTrainers();
    this.getUserDetails();
  }
  // get all trainers
  getTrainers() {
    this.trainerService.getAllTrainers().subscribe({
      next: (res) => {
        if (res.success) {
          this.trainers = res.data;
          $('.spinnerTrainers').css('visibility', 'hidden');
          //console.log(this.trainees);
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 2000);
      },
      complete: () => {},
    });
  }

  //get logged user details
  getUserDetails() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        if (res.success) {
          const data = res.data;

          this.loggedUserId = data._id;
          //console.log(data.trainersId[0]);
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  enroll(id: any) {
    $('.spinnerTrainers').css('visibility', 'visible');
    this.trainees = [];
    //console.log('before ' + this.trainees);

    const l = this.trainers.length;
    for (let i = 0; i < l; i++) {
      if (this.trainers[i]._id == id) {
        const z = this.trainers[i].traineesId.length;
        for (let j = 0; j < z; j++)
          this.trainees.push(this.trainers[i].traineesId[j]);
        //console.log('trainees' + this.trainees);
      }
    }

    //check for user login
    if (sessionStorage.getItem('user-token')) {
      //console.log("logged "+this.loggedUserId)
      //check for previous enrollment
      if (this.trainees.includes(id + '_' + this.loggedUserId)) {
        //console.log('enrolled');
        this.errorMsg = 'Your are already enrolled';
        this.showErrorsMsg = true;
        $('.spinnerTrainers').css('visibility', 'hidden');
        setTimeout(() => (this.showErrorsMsg = false), 2000);
      } else {
        //add trainees for selected trainer
        this.trainerService
          .addTrainees(id, { traineesId: id + '_' + this.loggedUserId })

          .subscribe({
            next: (res) => {
              if (res.success) {
                const data = res.data;
                this.successMsg = 'You have successfully enrolled ';
                this.showSuccessMsg = true;
                setTimeout(() => (this.showSuccessMsg = false), 2000);
                //console.log('trainees' + data.traineesId);
              } else {
                //console.log(res.message)
              }
            },
            error: (err) => {},
            complete: async () => {
              $('.spinnerTrainers').css('visibility', 'hidden');
              this.getTrainers();
            },
          });

        //add trainers for user
        this.userService
          .addTrainers(this.loggedUserId, {
            trainersId: this.loggedUserId + '_' + id,
          })

          .subscribe({
            next: (res) => {
              if (res.success) {
                const data = res.data;

                //console.log('trainers' + data.traineesId);
              } else {
                //console.log(res.message)
              }
            },
            error: (err) => {},
            complete: async () => {
              $('.spinnerTrainers').css('visibility', 'hidden');
              this.getTrainers();
            },
          });
      }
    } else {
      this.errorMsg = 'Log in to your account to enroll';
      this.showErrorsMsg = true;
      setTimeout(() => (this.showErrorsMsg = false), 2000);
      $('.spinnerTrainers').css('visibility', 'hidden');
    }
    //console.log('clicked ' + id);
    
  }
}
