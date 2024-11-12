import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedValue } from '../../redux/rootDropdown/reducer';
import { RootState } from '../../redux/store';

const Dropdown = (props: any) => {

    const dispatch = useDispatch();
    const selectedValue = useSelector((state:RootState) => state.selectRootDropdownValue.value)
    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        let value = event.target.value;
        dispatch(setSelectedValue(value));
    }
    return (
        <select value={selectedValue} onChange={handleChange}>
            {
                props.options.map((item: any, index:number) => {
                    return (
                        <option key={index} value={item.code}>{item.title}</option>
                    )
                })
            }
        </select>
    )
}

export default Dropdown;