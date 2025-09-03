import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightWinnerTicTacToe]'
})
export class HighlightWinnerTicTacToe {

  iswinningCombination = input(false);
  el = inject(ElementRef);

  stylesEffect = effect(() => {
    if (this.iswinningCombination()) {
      this.el.nativeElement.classList.add('winner');
    } else {
      this.el.nativeElement.classList.remove('winner');
    }
  });

}
