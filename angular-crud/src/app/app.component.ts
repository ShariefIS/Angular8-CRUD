import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-crud';
  crudOptions: any = {
    baseAPIUrl: "https://angularcrudapi.gear.host/api/",
    get: "CRUD/GetOrders?OrderID=0",
    edit: "CRUD/GetOrders?OrderID=",
    save: "CRUD/SaveOrder",
    delete: "CRUD/DeleteOrder?OrderID=",
    dataTableOptions: {
      columns: [
        { name: "orderName", displayName: "Order Name", format: "text" },
        { name: "amountCredit", displayName: "Paid", format: "amount" },
        { name: "orderCount", displayName: "No. of Items", format: "number" }
      ],
      pageLength: 6
    },
    events: {
      edited: this.onEdited,
      added: this.onAdded,
      deleted: this.onDeleted,
    }
  };
  onDeleted() {
    console.log("This Item is Deleted");
  }
  onEdited() {
    console.log("This item is edited");
  }
  onAdded() {
    console.log("This item is added");
  }

}
