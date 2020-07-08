import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import 'numeral'
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  isDTLoaded: Boolean = false;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this._httpService.get("https://angularcrudapi.gear.host/api/CRUD/GetOrders?OrderID=0")
      .subscribe((result: any) => {
        this.isDTLoaded = false;
        if (result.status === "Success")
          this.initDt(result.data.table, result.data.table1);
        else
          alert("Nai Chalra");

      });
  }
  initDt(tableData, columnsData) {
    let columnsConfig = [];
    columnsData.forEach(element => {
      switch (element.columnFormat) {
        case 'number':
          // var num_parts = data.toString().split(".");
          // num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          columnsConfig.push({
            title: element.columnDisplayName,
            data: element.columnName,
            className: 'dt-head-center dt-body-right',
            render: function (data: any) {
              return numeral(data).format('0,0')
            }
          });
          break
        case 'amount':
          columnsConfig.push({
            title: element.columnDisplayName,
            data: element.columnName,
            className: 'dt-head-center dt-body-right',
            render: function (data: any) {
              return numeral(data).format('($ 0.00 a)').toUpperCase();
            }
          });
          break;
        default:
          columnsConfig.push({
            title: element.columnDisplayName,
            data: element.columnName,
            className: 'dt-head-center'
          });
          break;
      }

    });
    columnsConfig.push({
      title: 'Action',
      data: "id",
      className: 'dt-head-center dt-body-center',
      render: function (data: any, type: any) {
        return `
        <button type="button" class="btn btn-outline-warning edit">Edit</button>
        <button type="button" class="btn btn-outline-danger delete">Delete</button>`;
      },
      createdCell: function (cell: Node, cellData: any, rowData: any, row: number, col: number) {
        $(cell).find('button.edit').on('click', () => {
          console.log("edit", cellData, "  ", rowData);
        });
        $(cell).find('button.delete').on('click', () => {
          console.log("delete", cellData, "  ", rowData);
        });
      }
    });

    this.dtOptions = {
      data: tableData,
      columns: columnsConfig
    };
    console.log(this.dtOptions);
    this.isDTLoaded = true;
  }

  

}
