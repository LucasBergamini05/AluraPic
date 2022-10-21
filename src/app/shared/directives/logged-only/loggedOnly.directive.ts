import { UserService } from './../../../core/user/user.service';
import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[LoggedOnly]'
})
export class LoggedOnlyDirective implements OnInit{

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ){}

  ngOnInit(): void {
    !this.userService.isLogged() &&
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none')
  }
}
