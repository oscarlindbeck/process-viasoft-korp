import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'main-form',
  imports: [NzModalModule, NzFormModule, NzInputModule, NzRadioModule, ReactiveFormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent {
  @Input()
  isVisible = false;

  @Input()
  isEditing = false;

  @Input()
  form: FormGroup;

  @Output()
  closeModal = new EventEmitter();

  @Output()
  submitForm = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: [''],
      quantity: [''],
      unit_measure: ['']
    });
  }

  handleCancel(): void {
    this.closeModal.emit();
  }

  handleSubmit(): void {
    const formValue = this.form.value;
    const newItem: Item = {
      description: formValue.description,
      quantity: Number(formValue.quantity),
      unit_measure: formValue.unit_measure
    };

    this.submitForm.emit(newItem);
  }
}
