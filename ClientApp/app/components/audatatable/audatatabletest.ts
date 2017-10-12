import { AuDatatableParameters } from 'au-datatable'
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject, observable } from 'aurelia-framework';
import { AuDatatableResponse } from 'au-datatable';

@autoinject
export class AuDataTableTest {
    @observable
    public data: Array<any>;
    public parameters: AuDatatableParameters = {
        tableData: [],
        searchQuery: "",
        totalRecords: 0,
        pageSize: 25,
        skip: 0,
        sortColumn: 1,
        sortDirection: 'ascending',
        currentPage: undefined,
        filters: []
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

        let sortColumn = "";
        
        switch (this.parameters.sortColumn.toString()) {
            case "0":
                sortColumn = "summary";
                break;
            case "1":
                sortColumn = "dateFormatted";
                break;
            case "2":
                sortColumn = "temperatureF"
                break;
            case "3":
                sortColumn = "temperatureF"
                break;
        }

        if (this.parameters.currentPage == undefined || this.parameters.currentPage == 0) {
            this.parameters.currentPage = 1;
        }
        
        let url = `http://localhost:5000/api/sampledata/weatherforecasts?pageSize=${this.parameters.pageSize}&pageNumber=${this.parameters.currentPage}&sortProperty=${sortColumn}&direction=${direction}`
        return await this.client.fetch(url)
            .then(response => response.json())
            .then(data => {
                return {
                    data: data.result,
                    totalRecords: data.count
                } as AuDatatableResponse;
            });

    }
}