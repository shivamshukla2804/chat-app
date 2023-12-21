import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SocketService {
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() { }

  registerUser(data: any) {
    this.socket.emit('register', data);
  }

  reqGroup(): void {
    this.socket.emit('getGroup');
  }

  getGroup(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('getGroup', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  getGroupLimt(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('groupLimit', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  isUserAlredayExist(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('isUserAvailable', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  getPersonalChatData(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('joinToChat', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  joinRoomStatus(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('user-joined', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('new message', (data) => {
        console.log(data, 'data in service!!');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  sendTypingStatus(data: any): void {
    this.socket.emit('typing', data);
  }

  getTypingStatus(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  offTypingStatus(data: any): void {
    this.socket.emit('offTyping', data);
  }

  getOffStatus(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('offTyping', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  leaveGroup(data: any) {
    this.socket.emit('leave-group', data);
  }

  getLeaveGroup() {
    return new Observable((observer) => {
      this.socket.on('leaveGroup', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  logoutUser(data: any) {
    this.socket.emit('logout', data);
  }

  getLogoutUser() {
    return new Observable((observer) => {
      this.socket.on('logout', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
