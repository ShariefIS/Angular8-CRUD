# Angular8-CRUD
Dynamic CRUD operations on Angular v8. integrated with [Jquery DataTables](https://l-lin.github.io/angular-datatables/#/getting-started) and [SweetAlert2](https://sweetalert2.github.io/).

## Installation

Use the package manager [npm](https://nodejs.org/en/) to install required packages in the code after download.

```bash
npm install
```
Or just 

```bash
npm i
```
## Demo

[Live Example Here](https://angularcrud.gear.host/)

## Usage

Once the project is ready navigate to src/app/app.component.ts to change/update the configurations in as per your need. Below is a sample configuration template that needs to be provided. Or the **CRUD Component** can be used as a selector in any component and configured the Input 
1. Configure Component in your HTML
```html
<app-crud [options]="crudOptions"></app-crud>
```
2. Configure CRUD options
```javascript
crudOptions: any = {
    baseAPIUrl: "https://<yourapi>/",
    get: "getData",
    edit: "edit/:Id",
    save: "save",
    delete: "delete/:Id",
    dataTableOptions: {
      columns: [
        { name: "name", displayName: "Employee Name", format: "text" },
        { name: "salary", displayName: "Salary", format: "amount" },
        { name: "age", displayName: "Employee Age", format: "number" }
      ]
    },
    events: {
      edited: this.onEdited,
      added: this.onAdded,
      deleted: this.onDeleted,
    }
  };
```
### Features and Implementation
Here's what it actually is.
1. The baseAPI url along with the *get*,*edit*,*save* and *delete* is the combined *API URL* of your middleware. Result object must follow the following standard:
```javascript
{
  status:"Success",
  data:...
}
```
#### Note: 
*Get and Edit Response:[]Array*

2. [Jquery DataTables](https://l-lin.github.io/angular-datatables/#/getting-started) Integrated with customizable options, just add your properties ([options supported by Jquery DataTables](https://l-lin.github.io/angular-datatables/#/basic/with-options)) along with fromats for viewing the data in the DataTable Grid. Formats supported: *text, amount, number*. Features such smart search pagination and sorting applied on the Grid.
```javascript
dataTableOptions: {
      columns: [
        { name: "name", displayName: "Employee Name", format: "text" },
        { name: "salary", displayName: "Salary", format: "amount" },
        { name: "age", displayName: "Employee Age", format: "number" }
      ],
      pageLength:10,
      pagingType: 'full_numbers'
    },
```
2. Edit/Add implemented on the same component with dynamic FormControls added both on Code and HTML. Need to pass **id** as the main param in *GET* for Editing and Adding.
3. Delete and Edit fired from DataTable Action Column.
4. [Sweet Alerts](https://sweetalert2.github.io/) on Save and Delete (with Confirmation).
5. Custom events/function can be passed into the option's **events** configurations which will be executed once the Edit, Add and Delete is done.
```javascript
events: {
      edited: this.onEdited,
      added: this.onAdded,
      deleted: this.onDeleted,
    }
```
