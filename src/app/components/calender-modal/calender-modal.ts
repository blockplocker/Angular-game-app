import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calender-modal',
  imports: [FormsModule],
  templateUrl: './calender-modal.html',
  styleUrl: './calender-modal.scss',
})
export class CalenderModal {
  @Input() isOpen = false;
  @Input() mode: 'create' | 'update' | 'error' | 'localStorageError' = 'create';
  @Input() title = '';
  @Input() eventDate: string = '';
  @Input() eventId: string = '';

  @Output() toggleStorage = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>(); 
  @Output() create = new EventEmitter<string>(); 
  @Output() update = new EventEmitter<string>();

  inputTitle: string = '';

  close() {
    this.cancel.emit();
    this.isOpen = false;
  }

  onDelete() {
    this.delete.emit(this.eventId);
    this.isOpen = false;
  }
  onCreate() {
    this.create.emit(this.inputTitle);
    this.isOpen = false;
    this.inputTitle = '';
  }
  onUpdate() {
    this.update.emit(this.inputTitle);
    this.isOpen = false;
    this.inputTitle = '';
  }

  useLocalStorage(){
    this.toggleStorage.emit();
    this.cancel.emit();
    this.isOpen = false;
  }
}
