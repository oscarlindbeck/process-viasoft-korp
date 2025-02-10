import { Component } from '@angular/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponent } from "./components/form/form.component";
import { TableComponent } from "./components/table/table.component";
import { Item } from './interfaces/item.interface';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-main',
  imports: [NzPageHeaderModule, NzGridModule, NzButtonModule, FormComponent, TableComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isVisible = false;
  isEditing = false;
  editingItemId: string | undefined;
  form: FormGroup;

  items: Item[] = [];

  constructor(private itemService: ItemService, private fb: FormBuilder) {
    this.loadItems();
    this.form = this.fb.group({
      description: [''],
      quantity: [''],
      unit_measure: ['']
    });
  }

  loadItems(): void {
    this.itemService.getAllItems().subscribe((data) => {
      this.items = data;
    });
  }

  onPost(item: Item): void {
    this.itemService.post(item).subscribe(() => {
      this.loadItems();
    })
  }

  onUpdate(id: string, item: Item): void {
    this.itemService.update(id, item).subscribe(() => {
      this.loadItems();
    })
  }

  onDelete(id: string): void {
    this.itemService.delete(id).subscribe(() => {
      this.loadItems();
    })
  }

  // Modal
  showCreateModal(): void {
    this.isEditing = false;
    this.form.reset();
    this.isVisible = true;
  }

  showEditModal(item: Item): void {
    this.isEditing = true;
    this.editingItemId = item.id;
    this.form.patchValue({
      description: item.description,
      quantity: item.quantity,
      unit_measure: item.unit_measure
    });
    this.isVisible = true;
  }

  handleConfirm(item: Item): void {
    if (this.isEditing) {
      this.itemService.update(this.editingItemId ? this.editingItemId : '', item).subscribe(() => {
        this.loadItems();
      })
    } else {
      this.itemService.post(item).subscribe(() => {
        this.loadItems();
      })
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
