import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { JoinUserComponent } from '../../../components/join-user/join-user.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MessageComponent } from '../../../components/message/message.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    ChatComponent,
    JoinUserComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule
  ]
})
export class ChatModule { }
