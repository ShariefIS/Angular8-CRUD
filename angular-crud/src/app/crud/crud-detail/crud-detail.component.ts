import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crud-detail',
  templateUrl: './crud-detail.component.html',
  styleUrls: ['./crud-detail.component.scss']
})
export class CrudDetailComponent implements OnInit {
  @Input() crudDetailObject: any;
  constructor() { }
  goBack(){
    //emit an event to crud component to enable the data table.
  }
  ngOnInit() {
  }

}
