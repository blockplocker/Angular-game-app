import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calender-modal',
  imports: [FormsModule],
  templateUrl: './calender-modal.html',
  styleUrl: './calender-modal.scss',
})
export class CalenderModal {
  @Input() isOpen = false;
  @Input() mode: 'create' | 'delete' | 'error' | 'localStorageError' = 'create';
  @Input() title = '';
  @Input() eventDate: string = '';
  @Input() eventId: string = '';

  @Output() confirm = new EventEmitter<string>(); 
  @Output() cancel = new EventEmitter<void>();
  @Output() toggleStorage = new EventEmitter<void>();

  inputTitle: string = '';

  close() {
    this.cancel.emit();
    this.isOpen = false;
  }

  onConfirm() {
    if (this.mode === 'create') {
      this.confirm.emit(this.inputTitle);
    } else if (this.mode === 'delete') {
      this.confirm.emit(this.eventId);
    }
    this.isOpen = false;
  }

  useLocalStorage(){
    this.toggleStorage.emit();
    this.isOpen = false;
  }
}
