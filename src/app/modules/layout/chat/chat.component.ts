import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../../services/socket/socket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common/common.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JoinUserComponent } from '../../../components/join-user/join-user.component';
import { ItypingUser } from '../../../constant/interface';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import { ACCOUNT } from '../../../constant/routes';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  chatForm!: FormGroup;
  allMesaages: any = {};
  messageData: any = [];
  userList: any = [];
  availableGroup: any = [];
  chatData: any;
  showChat: boolean = true;
  typingUser: ItypingUser = {
    typing: false,
    data: {},
  };

  constructor(
    private socketService: SocketService,
    private _fb: FormBuilder,
    public commonServie: CommonService,
    public dialog: MatDialog,
    private observer: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getGroup();
    this.getMessages();
    this.userJoinedStatus();
    this.getTypingStatus();
    this.getLogoutData();
    this.offTypingSatatus();
    this.getLeaveGroupData();
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1300px)'])
      .pipe(delay(1))
      .subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        // untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  createForm() {
    this.chatForm = this._fb.group({
      message: [''],
    });
  }

  getMessages() {
    this.socketService.getMessage().subscribe((data) => {
      this.socketService.offTypingStatus(data);
      this.allMesaages[data.sendTo].push(data);
      // console.log(data, "Getting message from server....", this.allMesaages);
    });
  }

  onMessageChange() {
    let data: any = {
      id: this.commonServie.getUserData.id,
      userName: this.commonServie.getUserData.name,
      type: this.chatData.type,
    };
    if (this.chatData.type == 'single') {
      data.sendTo = this.commonServie.getUserData.id + this.chatData.res.id;
    } else {
      data.sendTo = this.chatData.inputData;
    }
    this.socketService.sendTypingStatus(data);
  }

  getTypingStatus() {
    this.socketService.getTypingStatus().subscribe((data) => {
      // console.log(data, "typing status.....");
      this.typingUser = {
        data: data,
        typing: true,
      };
    });
  }

  offTypingSatatus() {
    this.socketService.getOffStatus().subscribe((data) => {
      // console.log("Hi!!! offf type status!", data);
      if (data.userInfo.id != this.commonServie.getUserData.id) {
        this.typingUser.typing = false;
      }
    });
  }

  getGroup() {
    this.socketService.reqGroup();
    this.socketService.getGroup().subscribe((res) => {
      this.availableGroup = res;
    });
  }

  userJoinedStatus() {
    this.socketService.joinRoomStatus().subscribe((data) => {
      let message = `${data.info.name} is joined ${data.info.inputData}`;
      this.availableGroup = data.availableGroup;
      // console.log(this.availableGroup, data, "group!!!!!!!!!");
      if (!this.allMesaages[data.info.inputData]) {
        this.commonServie.snackBar(message, 'Close', 'success-snackbar');
      }
    });
  }

  isGroupAvail(data: string) {
    let idx = this.userList.findIndex((item: any) => item.inputData === data);
    return idx;
  }

  addChat() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(JoinUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.type == 'single') {
          if (data.res.error) {
            this.commonServie.snackBar(data.res.message, 'Close', 'red-snackbar');
          } else {
            let isUser = this.userList.findIndex((userData: any) => userData.res.id === data.res.id);
            console.log(isUser, "is user present", this.commonServie.getUserData.id != data.res.id);
            if (isUser == -1 && this.commonServie.getUserData.id != data.res.id) {
              this.userList.push(data);
              let personalRoom = this.commonServie.getUserData.id + data.res.id;
              this.allMesaages[personalRoom] = [];
            }
          }
        } else {
          if (this.isGroupAvail(data.inputData) == -1) {
            console.log(this.userList, "Hi dialog close", data, "allMesaages", this.allMesaages);
            this.userList.push(data);
            this.allMesaages[data?.inputData] = [];
          } else {
            this.commonServie.snackBar(`${data.inputData} already exist!`, 'Close', 'red-snackbar');
          }
        }
      }
    });
  }

  onSelect(data: any) {
    this.chatData = data;
    if (data.type == 'single') {
      let personalRoom = this.commonServie.getUserData.id + data.res.id;
      this.messageData = this.allMesaages[personalRoom];
    } else {
      this.messageData = this.allMesaages[data?.inputData];
    }
    this.showChat = false;
    this.chatForm.controls.message.reset();
    // console.log(this.messageData, "on select", data);
  }

  openGroup(groupData: any,isOpenGroupClick:boolean=false) {
    // console.log(groupData, "join!!!");
    const joinRoomData = {
      name: this.commonServie.getUserData.name,
      userId: this.commonServie.getUserData.id,
      type: groupData.type,
      inputData: groupData.inputData,
    };
    this.socketService.joinRoom(joinRoomData);
    this.socketService.getGroupLimt().subscribe((data: any) => {
      if (data.limitExceed) {
        this.commonServie.snackBar(data.msg, 'Close', 'red-snackbar');
      } else {
        if (this.isGroupAvail(groupData.inputData) == -1 && isOpenGroupClick) {
          this.userList.push(joinRoomData);
          this.allMesaages[joinRoomData?.inputData] = [];
          console.log(joinRoomData, "join with availableGroup!", this.userList);
        }
      }
    });
  }

  onSubmit() {
    if (
      this.chatForm.controls.message.value &&
      this.chatForm.controls.message.value.trim()
    ) {
      if (this.chatForm.controls.message.value.length > 3000) {
        this.chatForm.controls.message.setValue(
          this.chatForm.controls.message.value.slice(0, 3000)
        );
        this.commonServie.snackBar('Message with more than 3000 characters not allowed!', 'Close', 'red-snackbar');
      }
      let data: any = {
        userInfo: this.commonServie.getUserData,
        type: this.chatData.type,
        message: this.chatForm.controls.message.value.trim(),
        createAt: this.commonServie.formatAMPM(new Date()),
      };
      if (this.chatData.type == 'single') {
        data.sendTo = this.commonServie.getUserData.id + this.chatData.res.id;
      } else {
        data.sendTo = this.chatData.inputData;
      }
      this.socketService.sendMessage(data);
    }
    this.chatForm.controls.message.reset();
    // console.log('hi222', data);
  }

  leaveGroup(grpData: any) {
    this.socketService.leaveGroup(grpData);
    delete this.allMesaages[grpData.inputData];
    let idx = this.userList.findIndex(
      (user: any) => user?.inputData === grpData.inputData
    );
    this.showChat = true;
    // console.log(idx,'ssssss');
    if (idx > -1) {
      this.userList.splice(idx, 1);
      // console.log(this.userList,"spliced!!");
    }
  }

  getLeaveGroupData() {
    this.socketService.getLeaveGroup().subscribe((data: any) => {
      this.commonServie.snackBar(`${data.name} leaved the ${data.inputData} group!`, 'Close', 'red-snackbar');
    });
  }

  getLogoutData() {
    this.socketService.getLogoutUser().subscribe((data: any) => {
      // console.log(data, "Logout User!", this.userList);
      let idx = this.userList.findIndex(
        (user: any) => user?.res?.id === data.id
      );
      // console.log(idx,"index!");
      if (idx > -1) {
        this.userList.splice(idx, 1);
        this.showChat = true;
        this.commonServie.snackBar(`${data.name} is left the chat!`, 'Close', 'red-snackbar');
        if (this.allMesaages[this.commonServie.getUserData.id + data.id]) {
          delete this.allMesaages[this.commonServie.getUserData.id + data.id];
          this.messageData = [];
        }
      }
    });
  }

  logOut() {
    this.socketService.logoutUser(this.commonServie.getUserData);
    this.commonServie.userData = {};
    this.router.navigate([ACCOUNT.fullUrl]);
  }

  ngOnDestroy(): void {
    this.socketService.logoutUser(this.commonServie.getUserData);
    this.commonServie.userData = {};
    this.socketService.disconnect();
  }
}
