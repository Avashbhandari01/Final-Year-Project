import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.Day}</th>
            <th>{individualExcelData.Time}</th>
            <th>{individualExcelData.ClassType}</th>
            <th>{individualExcelData.ModuleCode}</th>
            <th>{individualExcelData.ModuleTitle}</th>
            <th>{individualExcelData.Lecturer}</th>
            <th>{individualExcelData.Group}</th>
            <th>{individualExcelData.Block}</th>
            <th>{individualExcelData.Room}</th>
        </>
    )
}