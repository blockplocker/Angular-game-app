import { Directive, effect, ElementRef, inject, input, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]'
})
export class HighlightCompletedTodo {
  isCompleted = input(false);
  el = inject(ElementRef);

  stylesEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.classList.add('completed');
    } else {
      this.el.nativeElement.classList.remove('completed');
    }
  });
}

