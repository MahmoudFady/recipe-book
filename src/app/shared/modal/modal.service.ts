import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private message = new BehaviorSubject<string>('');
  private isTrue = new Subject();
  constructor() {}
  setMessage(msg: string) {
    this.message.next(msg);
  }
  getMessage() {
    return this.message.asObservable();
  }
  setResualtValue(value: boolean) {
    this.isTrue.next(value);
  }
  getResualtValue() {
    return this.isTrue.asObservable();
  }
}
