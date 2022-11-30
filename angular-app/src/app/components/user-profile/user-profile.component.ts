import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/auth/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';
import { ChatService } from 'src/app/shared/chat/chat.service';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userUpdateForm!: FormGroup;

  // messages
  showSuccessMsg!: boolean;
  showErrorsMsg!: boolean;
  errorMsg!: String;
  successMsg!: string;

  // tab controls
  tab: any;
  activeTab: string = 'update user';

  // user data
  data: any;
  selectedUserId: any;
  email: any;
  uname: any;
  gender: any;
  age!: Number;

  //profile image
  imageData!: string;
  profileImg!: string;

  loaded: boolean = false;

  //trainers
  selected: any = 0;
  trainers: any[] = [];
  ids: any[] = [];
  trainersIds: any[] = [];
  selectedTrainerId: any;
  unameTrainer: any;
  emailTrainer: any;
  areaTrainer: any;
  desTrainer: any;
  updateTrainerImg: any;

  //chat
  newMessage = '';
  userMsgs: any = [];
  trainerMsgs: any = [];

  socket: any;
  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(
    private userService: UserService,
    private trainerService: TrainerService,
    private chatService: ChatService,
    private router: Router
  ) {
    this.socket = io('');
    //this.chatService.getNewMessage().subscribe(message=>this.userMsgs.push(message))
  }

  ngOnInit(): void {
    this.getDetails();
    this.getTrainers();

    //using web socket to update chat
    this.socket.on('chatUserAdd', () => {
      this.displayMessage(this.selectedTrainerId);
      this.scrollToBottom();
    });

    // form validation
    this.userUpdateForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      uname: new FormControl('', [Validators.required]),
      age: new FormControl(Number(null), [Validators.required]),

      gender: new FormControl(''),
    });

    //this.userUpdateForm.get('gender')?.setValue('Male');
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  //getting default value from dropdown
  changeType(e: any) {
    this.userUpdateForm.get('gender')!.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // scroll to end of the chat
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  // tab function
  onTabClick(tab: string) {
    this.activeTab = tab;
    this.getDetails();
    this.getTrainers();
  }

  // update user data submit
  update(form: FormGroup) {
    const formData = new FormData();
    formData.append('file', this.imageData);
    formData.append('uname', form.controls['uname'].value);
    formData.append('email', form.controls['email'].value);
    formData.append('age', form.controls['age'].value);
    formData.append('gender', form.controls['gender'].value);
    console.log(this.userUpdateForm.value);
    this.userService
      .updateUserById(this.selectedUserId, formData, formData)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.successMsg = 'User Details Updated Successfully';
            this.showSuccessMsg = true;

            setTimeout(() => (this.showSuccessMsg = false), 4000);
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 4000);
          }
        },
        error: () => {
          this.errorMsg = 'Server Error';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        },
        complete: () => {
          this.getDetails();
        },
      });
  }

  //profile image upload function
  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.userUpdateForm.patchValue({ image: file });
    const allowedType = ['image/png', 'image/jpeg', 'image/jpg'];

    if (file && allowedType.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  //get user details
  getDetails() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;

          this.email = this.data.email;
          this.uname = this.data.uname;
          this.gender = this.data.gender;
          this.age = this.data.age;
          this.imageData = this.data.image;
          this.ids = this.data.trainersId;

          this.selectedUserId = this.data._id;

          this.userUpdateForm.get('gender')?.setValue(this.data.gender);
          this.profileImg = this.data.image;
          console.log('Ids ' + this.ids);
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  //get selected trainer details
  getTrainer(_id: string, item: any) {
    this.selectedTrainerId = _id;

    //adding style for selected trainer
    this.selected = item;
    this.trainerService.getTrainerById(_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.unameTrainer = res.data.uname;
          this.emailTrainer = res.data.email;
          this.areaTrainer = res.data.area;
          this.desTrainer = res.data.description;
          this.updateTrainerImg = res.data.image;
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {},
    });
    this.displayMessage(this.selectedTrainerId);
  }

  //get user enrolled trainers
  getTrainers() {
    this.trainersIds = [];

    for (let i = 0; i < this.ids.length; i++) {
      this.trainersIds.push(this.ids[i].split('_').pop());
    }

    this.trainers = [];
    for (let j = 0; j < this.trainersIds.length; j++) {
      this.trainerService.getTrainerById(this.trainersIds[j]).subscribe({
        next: (res) => {
          if (res.success) {
            this.trainers.push(res.data);
            this.unameTrainer = this.trainers[0].uname;
            this.emailTrainer = this.trainers[0].email;
            this.areaTrainer = this.trainers[0].area;
            this.desTrainer = this.trainers[0].description;
            this.updateTrainerImg = this.trainers[0].image;

            this.selectedTrainerId = this.trainers[0]._id;
          }
        },
        error: (err) => {
          this.errorMsg = 'Server Error';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        },
        complete: () => {
          this.displayMessage(this.selectedTrainerId);
        },
      });
    }

    console.log('trainersIds ' + this.trainersIds);
    console.log('trainers ' + this.trainers);
    console.log('uname' + this.unameTrainer);
  }

  //chat
  sendMessage() {
    console.log('user ' + this.selectedUserId);
    console.log('trainer' + this.selectedTrainerId);

    //this.chatService.sendMessage(this.newMessage)

    //add to user chat
    const data1 = {
      senderId: this.selectedUserId,
      receiverId: this.selectedTrainerId,
      messages: this.newMessage,
    };

    this.chatService.addUserChat(data1).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
        this.newMessage = '';
      },
    });

    //add to trainer chat
    const data2 = {
      senderId: this.selectedUserId,
      receiverId: this.selectedTrainerId,
      messages: this.newMessage,
    };
    this.chatService.addTrainerChat(data2).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
        this.newMessage = '';
      },
    });
  }

  //display msgs from database
  displayMessage(trainerId: string) {
    this.chatService.getUserChat(this.selectedUserId, trainerId).subscribe({
      next: (res) => {
        if (res.success) {
          this.userMsgs = res.data;
          //console.log(this.userMsgs[0].messages)
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {},
    });

    this.chatService.getTrainerChat(this.selectedUserId, trainerId).subscribe({
      next: (res) => {
        if (res.success) {
          this.trainerMsgs = res.data;
          //console.log(this.trainerMsgs[0].messages)
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {},
    });
  }
  // reset form field values
  restForm(form: FormGroup) {
    this.userService.selectedRegUser = {
      _id: ' ',
      uname: ' ',
      gender: ' ',
      age: Number(null),
      email: ' ',
      password: ' ',
      image: ' ',
    };
    form.reset();
    this.userUpdateForm.get('gender')?.setValue('Male');
    this.imageData = '';
  }
  // function for style selected trainer
  isActive(item: any) {
    return this.selected === item;
  }

  //convert data and time
  stringAsDate(dateStr: string) {
    let h = '';
    const d = new Date(dateStr);
    if (d.getTime() >= 12) {
      h = 'pm';
    } else {
      h = 'am';
    }

    return (
      d.getDay() +
      ' ' +
      d.toLocaleString('default', { month: 'short' }) +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes() +
      ' ' +
      h
    );
  }
}
