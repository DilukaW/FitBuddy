import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';
import { UserService } from 'src/app/shared/auth/user.service';
import { ChatService } from 'src/app/shared/chat/chat.service';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css'],
})
export class TrainerProfileComponent implements OnInit {
  // messages
  showSuccessMsg!: boolean;
  showErrorsMsg!: boolean;
  errorMsg!: String;
  successMsg!: string;

  //profile image
  imageData!: string;
  profileImg!: string;

  // tab controls
  tab: any;
  activeTab: string = 'enrolled trainees';

  //trainer
  data: any;
  trainerName:any
  trainerEmail:any
  trainerDescription:any
  selectedTrainerId!: string;

  //user
  users: any[] = [];
  usersIds: any[] = [];
  selected: any = 0;
  updateUserImg: any;
  ids: any;
  selectedUserId: any;
  uname: any;
  email: any;
  gender: any;
  age: any;
  userImg: any;

  //chat
  newMessage = '';
  userMsgs: any = [];
  trainerMsgs: any = [];

  socket: any;
  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(
    private trainerService: TrainerService,
    private userService: UserService,
    private chatService: ChatService
  ) {
    this.socket = io('');
  }

  ngOnInit(): void {
    this.getDetails();

    //using web socket to update chat
    this.socket.on('chatTrainerAdd', () => {
      this.displayMessage(this.selectedUserId);
      this.scrollToBottom();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
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

    this.getUsers();
  }
  //get trainer details
  getDetails() {
    this.trainerService.getTrainerProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
          this.trainerName=this.data.uname
          this.trainerEmail=this.data.email
          this.profileImg = this.data.image;
          this.ids = this.data.traineesId;

          this.selectedTrainerId = this.data._id;
          console.log('ids' + this.ids);
        } else {
        }
      },
      error: (err) => {},
      complete: () => {
        this.getUsers();
      },
    });
  }

  // function for style selected trainer
  isActive(item: any) {
    return this.selected === item;
  }

  //get selected user  details
  getUser(_id: string, item: any) {
    this.selectedUserId = _id;

    //adding style for selected trainer
    this.selected = item;
    this.userService.getUserById(_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.email = res.data.email;
          this.uname = res.data.uname;
          this.gender = res.data.gender;
          this.age = res.data.age;
          this.userImg = res.data.image;
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 2000);
      },
      complete: () => {},
    });
    this.displayMessage(this.selectedUserId);
  }

  //get user enrolled trainers
  getUsers() {
    this.usersIds = [];

    for (let i = 1; i < this.ids.length; i++) {
      this.usersIds.push(this.ids[i].split('_').pop());
    }
    console.log('usersIds'+this.usersIds)

    this.users = [];
    for (let j = 0; j < this.usersIds.length; j++) {
      this.userService.getUserById(this.usersIds[j]).subscribe({
        next: (res) => {
          if (res.success) {
            this.users.push(res.data);
            this.uname = this.users[0].uname;
            this.email = this.users[0].email;
            this.age = this.users[0].age;
            this.gender = this.users[0].gender;
            this.userImg = this.users[0].image;

            this.selectedUserId = this.users[0]._id;
          }
        },
        error: (err) => {
          this.errorMsg = 'Server Error11';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        },
        complete: () => {
          this.displayMessage(this.selectedUserId);
        },
      });
    }
  }

  //chat
  sendMessage() {
    //alert(this.newMessage);
    console.log('user ' + this.selectedUserId);
    console.log('trainer' + this.selectedTrainerId);

    //add to trainer chat
    const data2 = {
      senderId: this.selectedTrainerId,
      receiverId: this.selectedUserId,
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
        setTimeout(() => (this.showErrorsMsg = false), 2000);
      },
      complete: () => {
        this.newMessage = '';
      },
    });

    //add to user chat

    this.chatService.addUserChat(data2).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 2000);
      },
      complete: () => {
        this.newMessage = '';
      },
    });
  }
  //display msgs from database
  displayMessage(userId: string) {
    this.chatService.getTChat(this.selectedTrainerId, userId).subscribe({
      next: (res) => {
        if (res.success) {
          this.trainerMsgs = res.data;
          //console.log(this.trainerMsgs[0].messages)
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 2000);
      },
      complete: () => {},
    });

    this.chatService.getUChat(this.selectedTrainerId, userId).subscribe({
      next: (res) => {
        if (res.success) {
          this.userMsgs = res.data;
          //console.log(this.trainerMsgs[0].messages)
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
  //convert data and time
  stringAsDate(dateStr: string) {
    let h = '';
    const d = new Date(dateStr);
    if (d.getHours() >= 12) {
      h = 'pm';
    } else {
      h = 'am';
    }

    return (
      d.getUTCDate() +
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
