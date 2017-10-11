import { AuDatatableParameters } from 'au-datatable'
import { HttpClient, json  } from 'aurelia-fetch-client';
import { autoinject,observable } from 'aurelia-framework';
import { AuDatatableResponse } from 'au-datatable';

@autoinject
export class AuDataTableTest {
    @observable
    public data: Array<any>;
    public parameters: AuDatatableParameters = {
        tableData: undefined,
        searchQuery: undefined,
        totalRecords: undefined,
        pageSize: 10,
        skip: 0,
        sortColumn: 1,
        sortDirection: 'ascending',
        currentPage: 1,
        filters: []
    }

    dataChanged(newValue : any, oldValue: any){
        console.log(newValue)
    }

    constructor(private client: HttpClient) {

    }
    public async attached(): Promise<any> {
        let response = await this.fetchData(this.parameters);
        this.data = response.data;
        this.parameters.totalRecords = response.totalRecords;
        console.log(this.data.length);
    }

    public nextPage = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetchData(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[demo:next_page] Failed to load the data: `);
        }
    }

    public previousPage = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetchData(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[demo:previous_page] Failed to load the data: `);
        }
    }

    public changePage = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetchData(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[demo:change_page] Failed to load the data: `);
        }
    }

    public sort = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetchData(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[demo:sort] Failed to load the data: `);
        }
    }

    private async fetchData(parameters: AuDatatableParameters): Promise<any> {
        let direction = parameters.sortDirection == undefined
            ? undefined
            : parameters.sortDirection == 'ascending' ? "asc" : "desc";
        
        let response = await this.client.fetch('http://localhost:5000/api/sampledata/weatherforecasts', {
            method: 'POST',
            body: json({
                pageNumber: parameters.skip,
                pageSize: parameters.pageSize,       
                sortProperty: parameters.sortColumn,
                direction: direction,
               
            })
        })
        let mapped = await response.json();
        return {
            data: mapped.result,
            totalRecords: mapped.count
        } as AuDatatableResponse;
    }
}