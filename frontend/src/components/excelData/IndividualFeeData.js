import React from 'react'

export const IndividualFeeData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.student_ID}</th>
            <th>{individualExcelData.firstName}</th>
            <th>{individualExcelData.lastName}</th>
            <th>{individualExcelData.email}</th>
            <th>{individualExcelData.month}</th>
            <th>{individualExcelData.year}</th>
            <th>{individualExcelData.total}</th>

        </>
    )
}