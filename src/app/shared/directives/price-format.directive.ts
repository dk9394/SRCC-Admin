import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPriceFormat]'
})
export class PriceFormatDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('change', ['$event'])
  onchange(e) {
    this.elRef.nativeElement.value = parseFloat(e.target.value).toFixed(2);
  }

}
