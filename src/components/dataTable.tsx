import { useEffect, useRef, useState } from 'react';

function Datatable({ markerData }: any) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [options, setOptions] = useState([]);
    //sort data
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedColumn, setSelectedColumn] = useState<string>("");
    //filter data
    const [searchName, setBusinessCategory] = useState("");
    const [searchAge, setRiskRating] = useState("");

    useEffect(() => {
        setData(markerData);
        setFilteredData(markerData);
        const uniqueValues = new Set(markerData.map((row: { Year: any; }) => row.Year));
        const sortedValues: any = Array.from(uniqueValues).sort();
        setOptions(sortedValues);
    }, [markerData])

    useEffect(() => {
        if (searchName || searchAge) {
            const dataFilteredUsingFilter = filteredData.filter((row: any) =>
                row.Business_Category.toLowerCase().includes(searchName.toLowerCase())
            ).filter((row: any) =>
                String(row.Risk_Rating).includes(searchAge)
            );
            console.log(dataFilteredUsingFilter, "112");

            setFilteredData(dataFilteredUsingFilter)
        } else {
            setFilteredData(markerData)
        }
    }, [searchName, searchAge])

    //sort data start
    const handleSort = (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
        let columnName: any = event.currentTarget.dataset.column
        let order: "asc" | "desc" = "asc";
        if (selectedColumn === columnName) {
            order = sortOrder === "asc" ? "desc" : "asc";
        }
        setSelectedColumn(columnName);
        setSortOrder(order);
        const sorted = [...filteredData].sort((a, b) => {
            const val1 = a[columnName];
            const val2 = b[columnName];
            if (val1 > val2) return order === "asc" ? 1 : -1;
            if (val1 < val2) return order === "asc" ? -1 : 1;
            return 0;
        });
        setFilteredData(sorted);
    };
    //sort data end

    //filter data start
    const handleBusinessCategory = (event: any) => {
        setBusinessCategory(event.target.value);
    };

    const handleRiskRating = (event: any) => {
        setRiskRating(event.target.value);
    };

    //filter data end

    //filter table data based on year selected from dropdown
    const filterDataBasedOnYear = (event: any) => {
        const selectedValue = event.target.value;
        const displayData = data.filter((item: any) => item.Year === selectedValue);
        if (event.target.value === 'select') {
            setFilteredData(data);
            return
        }
        setFilteredData(displayData);
        setRiskRating('');
        setBusinessCategory('')
    };
    console.log(filteredData[0]);


    return (
        <div className='m-8'>
            <div>
                <div className='my-2 font-medium text-lg'>
                    Select year to load the data for selected year:
                </div>
                <div className='my-2 text-sm'>
                    <select onChange={filterDataBasedOnYear} className='w-50 border-2 border-gray-500 px-5 py-1'>
                        <option value='select'>--Select--</option>
                        {options.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='my-8'>
                <div className='font-medium text-lg'>
                    You can filter data using:
                </div>
                <div>
                    <div className='my-2 text-m'>
                        <label>Business Category:</label>
                        <input type="text" className='mx-2 border-2 border-gray-500 px-2' placeholder='Enter Business Category' value={searchName} onChange={handleBusinessCategory} />
                    </div>
                    <div className='my-2 text-m'>
                        <label>Risk Rating:</label>
                        <input type="text" className='mx-2 border-2 border-gray-500 px-2' placeholder='Enter Risk Rating' value={searchAge} onChange={handleRiskRating} />
                    </div>
                </div>
            </div>
            <div className='overflow-visible h-40'>
            <table id="climate-risk-table" className='border-2 border-gray-300' >
                <thead>
                    {filteredData.length ? (
                        <tr className='border-2 border-gray-300 px-2 py-1'>
                            {Object.keys(filteredData[0]).map((value) => (
                                value != 'Location' ? (
                                    <th className='border-2 border-gray-300' onClick={handleSort} data-column={value} key={value}>{value}</th>
                                ) : ''
                            ))}
                        </tr>
                    ) : (
                        <tr>
                            <th className='font-medium text-lg'>Please wait</th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {filteredData?.length ? (
                        filteredData.map((item: any, index: number) => (
                            <tr className='border-2 border-gray-300 px-2 py-1' key={index}>
                                <td className='border-2 border-gray-300 px-2 py-1'>{item.Asset_Name}</td>
                                <td className='border-2 border-gray-300 px-2 py-1'>{item.Lat}</td>
                                <td className='border-2 border-gray-300 px-2 py-1'>{item.Long}</td>
                                <td className='border-2 border-gray-300 px-2 py-1'>{item.Business_Category}</td>
                                <td className='border-2 border-gray-300 px-2 py-1'>{item.Risk_Rating}</td>
                                <td className='border-2 border-gray-300 px-2 py-1'>{item.Risk_Factors}</td>
                                <td className='border-2 border-gray-300 px-2 py-1'>{item.Year}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className='font-medium text-sm px-3 mx-5'>No data found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Datatable;
