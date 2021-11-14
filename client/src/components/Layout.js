import React from 'react'
import styled from 'styled-components';

const Main = styled.main` 
`

const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 20px;
`

const Layout = ({ children }) => {
    return (
        <Main>
            <Container>
                {children}
            </Container>
        </Main>
    )
}

export default Layout
