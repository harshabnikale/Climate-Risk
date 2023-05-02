
import { log } from 'console';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function LineGraph({ markerData, category, width }: any) {

    const [filteredData, setFilteredData] = useState<any>(null)
    const [options, setOptions] = useState<any>(null)
    const [columnNameOptions, setcolumnNameOptions] = useState<any>(null)
    const [currentColumn, setCurrentColumn] = useState<any>(null)

    function filterOptions(columnName: any) {
        if (columnName.target) {
            columnName = columnName.target.value
        }
        const uniqueValues = new Set(markerData.map((row: any) => row[`${columnName}`]));
        // console.log(selectedColumnName,'selectedColumnName')
        const sortedValues: any = Array.from(uniqueValues).sort();
        setOptions(sortedValues)
        setCurrentColumn(columnName)
        return sortedValues;
    }
    // let a = [{Year: 2030, riskRating: 0.4}, {Year: 2040, riskRating: 0.5},{Year: 2050, riskRating: 0.8}]
    //filter data based on user selection from dropdown
    const filterDataBasedOnYear = (selectedValue: any) => {
        if (selectedValue.target) {
            selectedValue = selectedValue.target.value;
        }
        let a: any = [];
        const displayData = markerData.filter((item: any) => item[currentColumn] === selectedValue);
        // console.log(displayData, "display data");
        //
        let newData = new Set(displayData.map((row: any) => row.Year));
        let sortedYearValues = Array.from(newData).sort();
        console.log(sortedYearValues, 'sortedYearValues');

        sortedYearValues.forEach(element => {
            const newData2 = displayData.filter((item: any) => item.Year === element); //data based on year year values
            console.log(newData2, "2");
            let average = 0;
            for (let i = 0; i < newData2.length; i++) {
                const element = newData2[i];
                average += parseFloat(element.Risk_Rating);
                // tooltip[`Business_Category`] = element.Business_Category
            }
            let risk = average / newData2.length
            a.push({ year: element, risk: risk })
        });
        console.log(a, "1");
        setFilteredData(a);
    };

    useEffect(() => {
        markerData.forEach((element: any) => {
            Object.assign(element, { Location: element.Lat + ',' + element.Long, });
            // a.push({location: element.Lat +','+ element.Long,})
        });
        const columnNames: any = Object.keys(markerData[0]);
        columnNames.indexOf('Lat') !== -1 && columnNames.splice(columnNames.indexOf('Lat'), 1)
        columnNames.indexOf('Long') !== -1 && columnNames.splice(columnNames.indexOf('Long'), 1)
        columnNames.indexOf('Risk_Rating') !== -1 && columnNames.splice(columnNames.indexOf('Risk_Rating'), 1)
        columnNames.indexOf('Risk_Factors') !== -1 && columnNames.splice(columnNames.indexOf('Risk_Factors'), 1)
        columnNames.indexOf('Year') !== -1 && columnNames.splice(columnNames.indexOf('Year'), 1)
        if(category){
            columnNames.unshift("Location");
            columnNames.pop()
        }

        setcolumnNameOptions(columnNames) 
        let secondFilter = filterOptions(columnNames[0])
        console.log(columnNames, 'Sorted values');
        console.log(columnNameOptions, 'columnNameOptions');

        filterDataBasedOnYear(secondFilter[0])
    }, [markerData])

    useEffect(() => {
        if (options?.length) {
            filterDataBasedOnYear(options[0])
        }
    }, [options])


    return (
        <div className='mx-5 my-10'>
            <div className='ml-16'>
                <select className='border-2 border-gray-600 px-5 py-1 w-50' onChange={filterOptions}>
                    {columnNameOptions?.map((value: any) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <select className='border-2 border-gray-600 px-5 py-1 w-50 ml-10' onChange={filterDataBasedOnYear}>
                    {options?.map((value: any) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className='my-8'>
                <LineChart width={width} height={500} data={filteredData}>
                    <XAxis dataKey="year" />
                    <YAxis dataKey="risk" />
                    <CartesianGrid stroke="#ccc" />
                    <Legend />
                    <Line type="monotone" dataKey="risk" stroke="#8884d8" />
                    {/* <Tooltip content={<div>{filteredData?.length? (filteredData[0].tooltip) : <div>hi</div>}</div>}/>   */}
                    <Tooltip />
                </LineChart>
            </div>
        </div>
    );
}

export default LineGraph
