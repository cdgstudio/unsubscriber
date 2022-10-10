# Unsubscriber

Easy to use service to unsubscribe from RxJs observables.

- Read more: https://codegen.studio/1297

## Prepare

```
npm i @cdgstudio/unsubscriber
```

## Example

```ts
@Component({
  providers: [Unsubscriber],
})
export class MyComponent implements OnInit {
  constructor(private unsubscriber: Unsubscriber) {}

  ngOnInit(): void {
    // with takeUntil pattern
    interval(1000).pipe(takeUntil(this.unsubscriber)).subscribe();

    // with unsubscribe pattern
    this.unsubscriber.add = interval(1000).subscribe();
  }
}
```
