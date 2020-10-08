import React, { useState } from 'react';
import {
    Select
} from "antd";

const { Option } = Select;

const SelectPeopleMnager = ({
    selected,
    onChange,
    people
}) => {


    const onChangeSelect = (e) => {
        console.log('in manager select manager', e)
        onChange(e);
    }

    return (
        <>
            <Select
                placeholder="Select Manager"
                defaultValue={selected ? selected : null}
                onChange={onChangeSelect}
            >
                {
                    people && people.length ?
                        people.map((j, i) => {
                            return (
                                <Option value={j.user.uid} key={i}>{j.firstName + ' ' + j.lastName}</Option>
                            )
                        }) : ""
                }
            </Select>

        </>
    );
};


export default SelectPeopleMnager
