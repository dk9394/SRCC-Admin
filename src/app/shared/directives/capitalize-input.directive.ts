import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCapitalizeInput]'
})
export class CapitalizeInputDirective {

  constructor(
    private elRef: ElementRef
  ) { }

  @HostListener('keyup', ['$event'])
  onkeyup(e) {
    const value: string = e.target.value;
    this.elRef.nativeElement.value = value.split(' ').map(v => v.slice(0, 1).toUpperCase() + v.slice(1)).join(' ');
  }

}
