import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  visibilityNavBar: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() { }

  setVisibilityNavBar(value: boolean) {
    this.visibilityNavBar.next(value);
  }

  getVisibilityNavBar() {
    return this.visibilityNavBar.asObservable();
  }
}
