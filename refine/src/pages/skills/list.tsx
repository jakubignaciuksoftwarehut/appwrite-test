import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

export const SkillList = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "id",
                headerName: "Id",
                minWidth: 50,
                flex: 1,
            },
            {
                field: "name",
                headerName: "Name",
                minWidth: 150,
                align: 'right',
                headerAlign: "right",
                flex: 1,
            },
            {
                field: "level",
                headerName: "Level",
                type: "number",
                minWidth: 50,
                flex: 1,
            },
            {
                field: "userId",
                headerName: "User id",
                minWidth: 50,
                align: 'right',
                headerAlign: "right",
                flex: 1,
            },
            {
                field: "experiencePercentInCurrentLevel",
                headerName: "Experience",
                type: "number",
                minWidth: 50,
                flex: 1,
            },
            {
                field: "createdAt",
                headerName: "created at",
                minWidth: 70,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
                align: 'right',
                headerAlign: "right",
                flex: 1,
            },
            {
                field: "$updatedAt",
                headerName: "updated at",
                minWidth: 70,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
                align: 'right',
                headerAlign: "right",
                flex: 1,
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 150,
                flex: 1,
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
