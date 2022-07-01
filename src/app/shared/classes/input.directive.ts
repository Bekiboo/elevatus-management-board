import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[formClasses]',
})
export class FormDirective {
  constructor(private el: ElementRef) {
    const nodeName = el.nativeElement.nodeName;

    if (nodeName == 'TEXTAREA' || nodeName == 'INPUT') {
      this.el.nativeElement.classList.add(
        'block',
        'p-2.5',
        'w-full',
        'text-sm',
        'text-gray-900',
        'bg-gray-50',
        'rounded-lg',
        'border',
        'border-gray-300',
        'focus:ring-blue-500',
        'focus:border-blue-500',
        'dark:bg-gray-700',
        'dark:border-gray-600',
        'dark:placeholder-gray-400',
        'dark:text-white',
        'dark:focus:ring-blue-500',
        'dark:focus:border-blue-500'
      );
    }

    if (nodeName == 'LABEL') {
      this.el.nativeElement.classList.add(
        'block',
        'mb-2',
        'text-sm',
        'font-medium',
        'text-gray-900',
        'dark:text-gray-300',
      );
    }
  }
}
