import React, {useState} from 'react';
import styled from 'styled-components';
import {Holes} from './Holes';
import {Parametr} from "./Parametr";
import lunka from './assets/lunka.png'
import {courseHandicapStore} from "./CourseHandicapStore";
import {Service} from "./services/Service";
import {HTTPClient} from "./common/HttpClient";
import {projectConfig} from "./services/ProjectStore";
// @ts-ignore
import Modal from 'react-modal';

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const service = new Service(projectConfig.serviceConfig.serviceAuthUrl, HTTPClient.getInstance())
    const [value, setValue] = useState(0);
    const [errors, setErrors] = useState([]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setValue(0)
    };
    const modalContent = (
        <div>
            <h2>Ошибка расчета</h2>
            <ErrorColumn>
                {errors.map((error, index) => (
                    <a key={index}>{error}</a>
                ))}
            </ErrorColumn>
            <button onClick={closeModal}>Закрыть</button>
        </div>
    );

    const handleClick = async () => {
        try {
            const flag = courseHandicapStore.getFlag()
            if (flag === '9') {
                setValue(await service.getResultNine(courseHandicapStore.getData()))
            } else if (flag === '18CR') {
                setValue(await service.getResultEighteenCR(courseHandicapStore.getData()))
            } else {
                setValue(await service.getResultEighteen(courseHandicapStore.getData()))
            }

        } catch (error) {
            // @ts-ignore
            console.log(error.response.data.errors)
            // @ts-ignore
            const values = Object.values(error.response.data.errors);
            // @ts-ignore
            setErrors(values)
            openModal();
        }

    };

    return (
        <PageContainer>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                {modalContent}
            </Modal>
            <MainContainer>
                <Column>
                    <Holes/>
                    <Parametr min={-10} max={54} title={"Handicap index"}/>
                    <Parametr min={55} max={155} title={"Par"}/>
                    <Parametr min={21} max={49} title={"CR"}/>
                    <Parametr min={27} max={49} title={"SR"}/>
                    <Button onClick={handleClick}>Рассчитать</Button>
                </Column>
                <Column>
                    <Text>Course Handicap: {value.toFixed(1)}</Text>
                    <Img src={lunka}/>
                </Column>
            </MainContainer>
            <a href={'https://www.usga.org/handicapping/roh/Content/rules/6%201%20Course%20Handicap%20Calculation.htm'}>
                Как считается?
            </a>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const Column = styled.div`
    display: flex;
    width: 50%;
    margin: auto;
    flex-direction: column;
    align-items: center;
`
const ErrorColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
`


const MainContainer = styled.div`
    width: 70%;
    height: fit-content;
    border: 1px black solid;
    display: flex;
`
const Img = styled.img`
    height: 70%;
`
const Text = styled.a`
    text-decoration: none;
    font-family: Roboto;
    font-weight: bold;
    font-size: 32px;
`

const Button = styled.button`
    background-color: #04AA6D;
    color: white;
    border: 0;
    font-size: 24px;
    margin: 10px;
    width: 70%;
    box-sizing: border-box;
    padding: 10px;
`

export default App;
