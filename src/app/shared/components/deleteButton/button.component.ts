import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { filter, interval, Observable, Subject, Subscription, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'admin-board-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  
  buttonSubscribtion: Subscription
  holdTime: Subject<number> = new Subject();
  state: Subject<string> = new Subject();
  cancel: Observable<string>;

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
    this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  onHold() {  
    this.holdTime.subscribe(
      (iteration) => {
        this.el.nativeElement.children[0].children[0].style.width = `${
          (iteration) / 10
        }%`
      }      
    );

    this.state.next('start');

    const tick = 10;

    interval(tick)
      .pipe(
        takeUntil(this.cancel),
        tap((iteration) => {
          if (iteration >= 100) {
            this.state.next('completed');
            this.el.nativeElement.children[0].children[0].style.width = "100%"
            this.el.nativeElement.children[0].children[0].children[0].classList.add('complete')
            return
          }
          this.holdTime.next(iteration * tick);
        }),
        take(101),
      )
      .subscribe();
  }

  ngOnInit(): void {
  }

}
