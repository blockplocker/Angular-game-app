import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ITransaction } from '../../interfaces/itransaction';

@Component({
  selector: 'app-finance-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './finance-forms.html',
  styleUrl: './finance-forms.scss',
})
export class FinanceForms {
  @Output() formSubmit = new EventEmitter<ITransaction>();
  date = new Date();
  incomeCategories = ['Salary', 'Bonus', 'Gifts', 'Investments', 'Other'];
  expenseCategories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];
  financesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.financesForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      title: ['', Validators.required],
      entryType: ['income', Validators.required],
      category: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  get currentCategories() {
    return this.financesForm?.get('entryType')?.value === 'income'
      ? this.incomeCategories
      : this.expenseCategories;
  }

  onSubmit() {
    if (this.financesForm.valid) {
      this.formSubmit.emit(this.financesForm.value as ITransaction);
    }
  }
}
