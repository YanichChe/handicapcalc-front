import React, {useState} from 'react';
import styled from "styled-components";
import {courseHandicapStore} from "./CourseHandicapStore";

export function Parametr({min, max, title}: {min: number, max: number, title: string}): JSX.Element {
    const [num, setNum] = useState(min);

    const handleInputChange = (value: number | string) => {
        if (typeof value === 'string') {
            value = parseFloat(value);
        }
        setNum(value);
        if (title === 'Handicap index') {
            courseHandicapStore.setHandicapIndex(value)
        } else if (title === 'CR') {
            courseHandicapStore.setCourseRating(value)
        } else if (title === 'SR') {
            courseHandicapStore.setSlopeRating(value)
        } else {
            courseHandicapStore.setPar(value)
        }
    };

    return (
        <Container>
            <a>{title}</a>
            <Input
                type="number"
                min={min}
                max={max}
                step={0.1}
                value={num}
                onChange={e => handleInputChange(e.target.value)}
            />
        </Container>

    );
}

const Container = styled.div`
    width: 70%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height:70px;
    margin: 20px;
    gap: 10px;
`

const Input = styled.input`
    border: 1px solid #cccccc;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px; 
    background: #ffffff !important;
    outline: none; 
    margin: 0;
    height: 40px;
    width: 100%;
    font-size: 18px;
    font-family: Tahoma;
`
