import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    place-content: center;
    background: #011C3A;
`

const Card = styled.div`
    max-width: 100%;
    width: 500px;
    height: auto;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
    padding: 2em;
    border-radius: 0.5em;
    background: #002C5E;
`

const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;
`

const Separator = styled.span`
    color: #0078FF;
`


const Subtitle = styled.p`
    font-size: 1rem;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 2rem;
`

const Input = styled.input`
    width: 80%;
    height: 40px;
    border: none;
    border-bottom: 2px solid #E7F2FF;
    padding: 0 0.5rem;
    margin: 0 auto 1rem;
    outline: none;
    background: none;
    color: #E7F2FF;

    transition: border-bottom-color 0.3s ease-in-out;

    &:focus {
        border-bottom-color: #0078FF;
    } 

    ::placeholder,
  ::-webkit-input-placeholder {
    color: #E7F2FF;
  }
  :-ms-input-placeholder {
     color: #E7F2FF;
  }
`

const Button = styled.button`
    display: block;
    width: 80%;
    margin: 2rem auto 0;
    background: #E7F2FF;
    border: none;
    outline: none;
    padding: 15px 0;
    border-radius: 0.25rem;
    font-size: 1.2rem;
    font-weight: bold;
`

const Paragraph = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
`

const Link = styled.a`
  color: inherit;
`

const Register = () => {
    return (
        <Container>
            <Card>
                <Title>Posts<Separator>/</Separator>manager</Title>
                <Form>
                    <Input placeholder="Username"></Input>
                    <Input placeholder="Email"></Input>
                    <Input placeholder="Password"></Input>
                    <Input placeholder="Confirm password"></Input>
                    <Button>Register</Button>
                </Form>
                <Paragraph>Have an account? <Link href="#">Login here.</Link></Paragraph>
            </Card>
        </Container>
    )
}




export default Register
