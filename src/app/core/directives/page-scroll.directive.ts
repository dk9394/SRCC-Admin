import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appPageScroll]'
})
export class PageScrollDirective {
  @HostBinding('class.page-scrolled') isScrolled: boolean;

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onPageScroll(event) {
    if (event.target.scrollingElement.scrollTop) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

}
