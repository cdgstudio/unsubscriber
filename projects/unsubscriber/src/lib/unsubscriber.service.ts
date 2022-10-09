import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class Unsubscriber extends Subject<void> implements OnDestroy {
  private subs = new Subscription();

  set add(sub: Subscription) {
    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.next();
    this.complete();
    this.subs.unsubscribe();
  }
}
