import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modal-wrapper',
  imports: [FormsModule],
  templateUrl: './modal-wrapper.html',
  styleUrl: './modal-wrapper.scss'
})
export class ModalWrapper {

  @Input() isOpen = false;
  @Input() title = '';

  @Output() cancel = new EventEmitter<void>();


  close() {
    this.cancel.emit();
    this.isOpen = false;
  }

}
