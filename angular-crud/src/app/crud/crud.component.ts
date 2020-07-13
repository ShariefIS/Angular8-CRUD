import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormControl } from '@angular/forms'
import 'numeral';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  @Input() options: any;
  crudForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  isDTLoaded: boolean = false;
  displayCrud: boolean = false;
  columnProperties: any;
  mode: string = "Add";
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    console.log(this.options);
    this.columnProperties = this.options.dataTableOptions.columns;
    this.initDt();
  }

  initDt() {
    this._httpService.get(`${this.options.baseAPIUrl}${this.options.get}`)
      .subscribe((result: any) => {
        this.isDTLoaded = false;
        if (result.status !== "Success")
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Could'nt fetch data!",
            timer: 1500,
            showConfirmButton: false,
          });
        let columnsConfig = [];
        // this.columnProperties = result.data.table1;
        this.columnProperties.forEach(element => {
          switch (element.format) {
            case 'number':
              // var num_parts = data.toString().split(".");
              // num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              columnsConfig.push({
                title: element.displayName,
                data: element.name,
                className: 'dt-head-center dt-body-right',
                render: function (data: any) {
                  return numeral(data).format('0,0')
                }
              });
              break
            case 'amount':
              columnsConfig.push({
                title: element.displayName,
                data: element.name,
                className: 'dt-head-center dt-body-right',
                render: function (data: any) {
                  return numeral(data).format('($ 0.00 a)').toUpperCase();
                }
              });
              break;
            default:
              columnsConfig.push({
                title: element.displayName,
                data: element.name,
                className: 'dt-head-center'
              });
              break;
          }

        });
        var self = this;
        columnsConfig.push({
          title: 'Action',
          data: "id",
          orderable: false,
          className: 'dt-head-center dt-body-center',
          render: function (data: any, type: any) {
            return `<button type="button" class="btn btn-outline-warning edit">Edit</button> 
                    <button type="button" class="btn btn-outline-danger delete">Delete</button>`;
          },
          createdCell: function (cell: Node, cellData: any, rowData: any, row: number, col: number) {
            $(cell).find('button.edit').on('click', () => {
              console.log("edit", cellData, "  ", rowData);
              self.onEditingItem(cellData);
            });
            $(cell).find('button.delete').on('click', () => {
              console.log("delete", cellData, "  ", rowData);
              self.onDeleteItem(cellData);
            });
          }
        });

        this.dtOptions = Object.assign({}, this.options.dataTableOptions, {
          dom: 'ftip',
          data: result.data,
          columns: columnsConfig,
          order: [[this.columnProperties.length, "desc"]],
        });
        console.log(this.dtOptions);
        this.isDTLoaded = true;
      });
  }
  initForm(data) {
    let columnProp = {};
    if (data) {
      this.columnProperties.forEach(item => {
        if (item.name in data) {
          columnProp[item.name] = new FormControl(data[item.name]);
        }
      });
      columnProp["id"] = new FormControl(data['id']);
    } else {
      this.columnProperties.forEach(item => {
        columnProp[item.name] = new FormControl(null);
      });
      columnProp["id"] = new FormControl(0);
    }
    this.crudForm = new FormGroup(columnProp);
  }
  onAddingItem() {
    this.mode = "Add";
    this.initForm(null);
    this.displayCrud = true;
    this.isDTLoaded = false;
  }
  onEditingItem(cellData: any) {
    this.mode = "Edit";
    this._httpService.get(`${this.options.baseAPIUrl}${this.options.edit}${cellData}`)
      .subscribe((result: any) => {
        this.initForm(result.data[0]);
        this.displayCrud = true;
        this.isDTLoaded = false;

      });
  }
  onDeleteItem(cellData: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._httpService.get(`${this.options.baseAPIUrl}${this.options.delete}${cellData}`)
          .subscribe((result: any) => {
            if (result.status === "Success") {
              this.isDTLoaded = false;
              this.onCancel();
              Swal.fire(
                {
                  icon: "success",
                  title: 'Deleted',
                  text: "Item Deleted Successfully",
                  timer: 1500,
                  showConfirmButton: false,
                }
              );
            }
            this.options.events.deleted();
          });
      }
    })

  }
  onCancel() {
    this.displayCrud = false;
    this.initDt();
  }
  onSubmit() {
    console.log('after Submit', this.crudForm.value);
    this._httpService.post(`${this.options.baseAPIUrl}${this.options.save}`, this.crudForm.value)
      .subscribe((result: any) => {

        if (result.status !== "Success") {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Saved Failed, Please try again later",
            timer: 1500,
            showConfirmButton: false,
          });
          return;
        }

        this.onCancel();
        Swal.fire({
          icon: "success",
          title: this.mode == 'Add' ? 'Added' : 'Edited',
          text: `Item ${this.mode == 'Add' ? 'Added' : 'Edited'} Successfully!`,
          timer: 1500,
          showConfirmButton: false,
        });
        if (this.mode == "Add")
          this.options.events.added();

        else if (this.mode == "Edit")
          this.options.events.edited();
      });
  }
}
