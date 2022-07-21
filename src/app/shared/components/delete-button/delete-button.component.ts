import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  filter,
  interval,
  Observable,
  Subject,
  Subscription,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'admin-board-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css'],
})
export class ButtonComponent implements OnInit {
  buttonSubscribtion: Subscription;
  holdTime: Subject<number> = new Subject();
  state: Subject<string> = new Subject();
  cancel: Observable<string>;

  currentState: string;
  subscription: Subscription = this.state.subscribe(
    (state) => (this.currentState = state)
  );

  complete: boolean;

  @Output() completedEvent = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {
    this.cancel = this.state.pipe(
      filter((event) => event === 'cancel'),
      tap((event) => {
        this.holdTime.next(0);
      })
    );
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    if (!this.complete) this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    if (!this.complete) {
      this.holdTime.subscribe((iteration) => {
        this.el.nativeElement.children[0].children[0].style.width = `${
          iteration / 10
        }%`;
      });
      this.state.next('start');

      const tick = 10;

      interval(tick)
        .pipe(
          takeUntil(this.cancel),
          tap((iteration) => {
            if (iteration >= 100) {
              this.onComplete();
            }
            this.holdTime.next(iteration * tick);
          }),
          take(101)
        )
        .subscribe();
    }
  }

  onComplete() {
    this.state.next('completed');
    this.completedEvent.emit(true);
    this.complete = true;
    return;
  }

  ngOnInit(): void {}
}
