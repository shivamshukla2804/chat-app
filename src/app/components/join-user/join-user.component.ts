import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services/common/common.service';
import { SocketService } from '../../services/socket/socket.service';
import { ChatComponent } from '../../modules/layout/chat/chat.component';

@Component({
  selector: 'app-join-user',
  templateUrl: './join-user.component.html',
  styleUrls: ['./join-user.component.scss'],
})
export class JoinUserComponent implements OnInit {
  chatForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private commonServie: CommonService,
    public dialogRef: MatDialogRef<ChatComponent>,
    private socket: SocketService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getPersonalJoinUpdate();
  }

  createForm() {
    this.chatForm = this._fb.group({
      option: ['', Validators.required],
      data: ['', Validators.required],
    });
  }

  getPersonalJoinUpdate() {
    this.socket.getPersonalChatData().subscribe(res => {
      // console.log(res,"Personal chat data!!!!!!");
      if (res.error) {
        this.dialogRef.close({ res, type: this.chatForm.controls.option.value });
      } else {
        this.dialogRef.close({ res, type: this.chatForm.controls.option.value });
      }
    })
  }

  onSubmit() {
    if (this.chatForm.controls.data.value && this.chatForm.controls.data.value.trim()) {
      const joinRoomData = {
        name: this.commonServie.getUserData.name,
        userId: this.commonServie.getUserData.id,
        type: this.chatForm.controls.option.value,
        inputData: this.chatForm.controls.data.value.trim().toLowerCase()
      };
      // console.log(joinRoomData, "hii");

      this.socket.joinRoom(joinRoomData);
      if (joinRoomData.type == 'group') {
        this.socket.getGroupLimt().subscribe((data: any) => {
          if (data.limitExceed) {
            this.commonServie.snackBar( data.msg, 'Close', 'red-snackbar');
            this.dialogRef.close();
          } else {
            this.dialogRef.close(joinRoomData);
          }
        });
      }
    }
    this.chatForm.controls.data.reset();
  }

  close() {
    this.dialogRef.close();
  }

  //implementation
  // onSubmit() {
  //   let data: IroomDetail = {
  //     roomName: this.chatForm.controls.channelName.value,
  //     type: this.chatForm.controls.option.value,
  //     users: [],
  //   };
  //   const joinRoomData = {
  //     name: this.commonServie.getUserData.name,
  //     userId: this.commonServie.getUserData.id,
  //     roomName: this.chatForm.controls.channelName.value
  //   };
  //   let room = localStorage.getItem(
  //     this.chatForm.controls.channelName.value
  //   );
  //   let roomData = room ? JSON.parse(room) : [];
  //   if (localStorage.getItem(this.chatForm.controls.channelName.value)) {
  //     console.log(this.isUser(roomData.users), "genius!!", roomData.users.length);
  //     if ((this.isUser(roomData.users)) == -1) {
  //       if (this.chatForm.controls.option.value === 'single' && roomData.users.length < 2) {
  //         roomData.users.push(this.commonServie.getUserData);
  //       } else if (this.chatForm.controls.option.value === 'group') {
  //         roomData.users.push(this.commonServie.getUserData);
  //       }
  //       console.log(roomData, 'data from localStorage!!', roomData?.users);
  //       localStorage.setItem(
  //         this.chatForm.controls.channelName.value,
  //         JSON.stringify(roomData)
  //       );
  //     }
  //   } else {
  //     data.users.push(this.commonServie.getUserData);
  //     localStorage.setItem(
  //       this.chatForm.controls.channelName.value,
  //       JSON.stringify(data)
  //     );
  //   }
  //   this.socket.joinRoom(joinRoomData);
  //   this.dialogRef.close(joinRoomData);
  // }
}
