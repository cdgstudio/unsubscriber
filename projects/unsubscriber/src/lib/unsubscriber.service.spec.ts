import { waitForAsync } from '@angular/core/testing';
import { forkJoin, interval, takeUntil } from 'rxjs';
import { Unsubscriber } from './unsubscriber.service';

describe('Unsubscriber', () => {
  it('should create a instance', () => {
    const instance = new Unsubscriber();

    expect(instance).toBeTruthy();
  });

  it('should unsubscribe added subscriptions after destroy', waitForAsync(() => {
    const instance = new Unsubscriber();

    const sub1 = interval(1_000).subscribe();
    const sub2 = interval(1_000).subscribe();
    const sub3 = interval(1_000).subscribe();

    instance.add = sub1;
    instance.add = sub2;
    instance.add = sub3;

    instance.ngOnDestroy();

    expect(sub1.closed).toBeTrue();
    expect(sub2.closed).toBeTrue();
    expect(sub3.closed).toBeTrue();
  }));

  it('should complete sources after after destroy', waitForAsync(() => {
    const instance = new Unsubscriber();

    const activeSub = forkJoin([
      interval(100).pipe(takeUntil(instance)),
      interval(100).pipe(takeUntil(instance)),
      interval(100).pipe(takeUntil(instance)),
    ]).subscribe();

    setTimeout(() => {
      instance.ngOnDestroy();
      expect(activeSub.closed).toBeTrue;
    }, 500);
  }), 1_000);
});
