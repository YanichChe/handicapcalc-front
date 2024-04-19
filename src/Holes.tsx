import React, { useState } from 'react';
import Select from 'react-select';
import styled from "styled-components";
import {courseHandicapStore} from "./CourseHandicapStore";

const options = [
    { value: '18CR', label: '18 без параметра CR' },
    { value: '18', label: '18' },
    { value: '9', label: '9' },
];

export const Holes = () => {
    const [selectedOption, setSelectedOption] = useState(options.at(2));

    // @ts-ignore
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        courseHandicapStore.setFlag(selectedOption.value)
    };

    return (
        <Container>
            <a>Параметр лунок</a>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
            />
        </Container>

    );
}

const Container = styled.div`
    width: 70%;
    height: 70px;
    margin: 20px;
    gap: 20px;
`