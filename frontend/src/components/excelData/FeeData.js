import React from 'react'
import { IndividualFeeData } from './IndividualFeeData'

export const FeeData = ({ excelFile }) => {
    return excelFile.map((individualExcelData) => (
        <tr key={individualExcelData.id}>
            <IndividualFeeData individualExcelData={individualExcelData} />
        </tr>
    ))
}