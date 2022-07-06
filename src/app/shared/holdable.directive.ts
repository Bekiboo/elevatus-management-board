import { transition } from '@angular/animations';
import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[holdable]',
})
export class HoldableDirective {
  holdTime: Subject<number> = new Subject();

  state: Subject<string> = new Subject();

  cancel: Observable<string>;

  constructor(private el: ElementRef) {
    this.cancel = this.state.pipe(
      filter((event) => event === 'cancel'),
      tap((event) => {
        console.log('%c stopped hold', 'color: #ec6969; font-weight: bold;');
        this.holdTime.next(0);
      })
    );

    // this.el.nativeElement.style.transition = '0.01s all ease'

    this.holdTime.subscribe(
      (iteration) =>
        (this.el.nativeElement.style.outlineWidth = `${
          (iteration * iteration) / 2000 + 2
        }px`)
      
    );

    this.holdTime.subscribe((iteration) => {
      if (iteration > 1000) {
        this.holdTime.next(1000);
        console.log('%c Succeed', 'color: #5fba7d; font-weight: bold;');
        
      }
    })
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('%c started hold', 'color: #5fba7d; font-weight: bold;');

    this.state.next('start');

    const tick = 10;

    interval(tick)
      .pipe(
        takeUntil(this.cancel),
        tap((iteration) => {
          this.holdTime.next(iteration * tick);
        })
      )
      .subscribe();
  }
}

// Inspired by Fireship tutorial: https://www.youtube.com/watch?v=kl-UMCHpEsw
