import React from "react";
import { MDBDataTable } from 'mdbreact';

const Table = ({events}) => {
    const data = {
        columns: [
            {
                label: 'Id',
                field: 'userId',
                sort: 'asc',
            }, {
                label: 'Name',
                field: 'name',
                sort: 'asc',
            },
            {
                label: 'type',
                field: 'type',
                sort: 'asc',
            },
            {
                label: 'start date',
                field: 'startDate',
                sort: 'asc',
            },
            {
                label: 'end date',
                field: 'endDate',
                sort: 'asc',
            }
        ],
        rows: events
    };

    return(
        <MDBDataTable
            striped
            bordered
            small
            data={data}
        />
    );
};

export default Table;