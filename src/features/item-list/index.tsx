import React, { useEffect, useState, useMemo } from 'react';
import Item from '../../components/item';
import Dropdown from '../../components/dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { makeDataFormat } from '../../helpers';
import { Inputdata } from '../../helpers';
import TreeTable from '../../components/treetable'


const ItemList = () => {
    const selectRootDropdown =  useSelector((state: RootState) => state.selectRootDropdownValue.value);
    const [resposeData, setResponseData] = useState<Inputdata>({
        data: []
    });

    useEffect(() => {
        fetch('/data.json')
        .then(response => response.json())
        .then( data => setResponseData(data))
        .catch(error => console.error('There is something problem in fetch'))
    }, []);

    const memoizedResponseData = useMemo(() => {
        return makeDataFormat(resposeData)
    }, [resposeData]);

    console.log('memo-->>', memoizedResponseData);
    console.log('selectRootDropdown-->>', selectRootDropdown);
    return (
        <>
        <Dropdown options={memoizedResponseData['00 00 00']}/>
        <TreeTable data ={memoizedResponseData} selectedDropdown = {selectRootDropdown}/>
        </>
    )
}

export default ItemList;