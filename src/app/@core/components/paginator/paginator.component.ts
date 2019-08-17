import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() collectionSize: number = null;
  @Input() rotate: number = null;
  @Input() maxSize: number = null;
  @Input() pageSize: number = null;
  @Input() boundaryLinks: boolean = null;
  @Input() page: boolean = null;
  @Input() disabled: boolean = false;
  @Input() size: string = '';
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onPageChange($event: any): void{
    this.pageChange.emit($event);
  }

}
