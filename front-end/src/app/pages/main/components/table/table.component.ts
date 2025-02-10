import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CommonModule } from '@angular/common';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'main-table',
  imports: [NzTableModule, NzIconModule, NzDividerModule, NzPopconfirmModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input({
    required: true
  })
  items: Item[] = [];

  @Output()
  editItem = new EventEmitter<Item>();

  onEdit(item: Item): void {
    this.editItem.emit(item);
  }

  @Output()
  deleteItemId = new EventEmitter<string>();

  onDelete(id: string): void {
    this.deleteItemId.emit(id);
  }
}
