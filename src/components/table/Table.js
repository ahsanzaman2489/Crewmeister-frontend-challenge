import React from "react";
import {MDBDataTable} from 'mdbreact';

const Table = ({events}) => {
    const data = {
        columns: [
         {
                label: 'Title',
                field: 'title',
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
            },
            {
                label: 'created at',
                field: 'createdAt',
                sort: 'asc',
            },
            {
                label: 'confirmed at',
                field: 'confirmedAt',
                sort: 'asc',
            }, {
                label: 'note',
                field: 'memberNote',
                sort: 'asc',
            }
        ],
        rows: events
    };

    return (
        <MDBDataTable
            striped
            bordered
            small
            data={data}
        />
    );
};

export default Table;