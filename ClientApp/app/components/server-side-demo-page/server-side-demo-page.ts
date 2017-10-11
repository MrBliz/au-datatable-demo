import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { AuDatatableParameters } from 'au-datatable';
import { AuDatatableFilter } from 'au-datatable';
import { AuDatatableResponse } from 'au-datatable';

@autoinject()
export class ServerSideDemoPage {

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
       
    }
    public tableFilters: Array<any> =
    [
        {
            description: 'Contains',
            applyToColumns: [1, 3, 4, 5, 6]
        },
        {
            description: 'Greater Than',
            applyToColumns: [2]
        },
        {
            description: 'Smaller Than',
            applyToColumns: [2]
        },
        {
            description: 'Equals',
            applyToColumns: [1, 2, 3, 4, 5, 6]
        }
    ];

    constructor(
        private http: HttpClient,
    ) { }

    public async attached(): Promise<any> {
        let response = await this.fetchData(this.parameters);
        this.data = response.data;
        this.parameters.totalRecords = response.totalRecords;
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

    public search = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetchData(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[demo:change_page] Failed to load the data: `);
        }
    }

    public pageSizeChanged = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetchData(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[demo:change_page] Failed to load the data: `);
        }
    }

    public filter = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetchData(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[demo:filter] Failed to load the data: `);
        }
    }

    private async fetchData(parameters: AuDatatableParameters): Promise<any> {
        let direction = parameters.sortDirection == undefined
            ? undefined
            : parameters.sortDirection == 'ascending' ? 0 : 1;
       
        
        let response = await this.http.fetch('https://api.dtaalbers.com/au-datatable/datatable', {
            method: 'POST',
            body: json({
                skip: parameters.skip,
                page_size: parameters.pageSize,
                search_query: parameters.searchQuery,
                sort_column: parameters.sortColumn,
                sort_direction: direction,
              
            })
        })
        let mapped = await response.json();
        return {
            data: mapped.data,
            totalRecords: mapped.total_records
        } as AuDatatableResponse;
    }

    private descriptionToEnum(description: string): number {
        switch (description) {
            case 'Greater Than': return 0;
            case 'Smaller Than': return 1;
            case 'Equals': return 2;
            case 'Contains': return 3;
            default: return 0;
        }
    }
}
                        