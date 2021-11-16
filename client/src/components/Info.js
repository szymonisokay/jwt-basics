import React from 'react'
import styled from 'styled-components'
// Icon
import { ReactComponent as ExclamationIcon } from '../images/ExclamationIcon.svg'

const InfoContainer = styled.div`
    width: 100%;
    height: auto;
    background: ${props => props.backgroundColor === 'success' ? '#307452' : '#AF0000'};
    padding: 1rem 1.2rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Text = styled.p`
    color: white;
`

const Info = ({ text, type }) => {
    return (
        <InfoContainer backgroundColor={type}>
            <ExclamationIcon className="info-icon" />
            <div>{text.map((singleText, index) => <Text key={index}>{singleText}</Text>)}</div>
        </InfoContainer>
    )
}

export default Info
