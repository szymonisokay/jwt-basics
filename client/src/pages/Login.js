import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
// Image
import { ReactComponent as LoginImage } from '../images/LoginImage.svg'
// Icons
import { ReactComponent as EnvelopeIcon } from '../images/EnvelopeIcon.svg'
import { ReactComponent as KeyIcon } from '../images/KeyIcon.svg'
import { ReactComponent as EyeHideIcon } from '../images/EyeHideIcon.svg'
import { ReactComponent as EyeShowIcon } from '../images/EyeShowIcon.svg'
// Logo
import { ReactComponent as Logo } from '../images/Logo.svg'
// Components
import Info from '../components/Info';

// axios
const axios = require('axios').default

const Background = styled.section`
    width: 100%;
    height: 100vh;
    background: #BFFFE5;
`

const Header = styled.div`
    width: 100%;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
`

const Container = styled.div`
    max-width: 1300px;
    height: 100%;
    display: flex;
    align-items: center; 
    margin: 0 auto;
`
const ImageContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const FormContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TextContainer = styled.div`
    width: 400px;
`

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
    font-size: 1rem;
    color: #4D6C5D;
    margin-bottom: 3rem;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const InputContainer = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 1rem;
`

const Input = styled.input`
    width: 100%;
    height: 50px;
    border: 2px solid #95CCB6;
    padding: 0 3rem;
    outline: none;
    background: none;
    color: #0A0E0C;
    border-radius: 0.5rem;

    transition: border-color 0.3s ease-in-out;

    &:focus {
        border-color: #0A0E0C;
    } 

    ::placeholder,
    ::-webkit-input-placeholder {
    color: #0A0E0C;
  }
  :-ms-input-placeholder {
     color: #0A0E0C;
  }
`

const Button = styled.button`
    display: block;
    width: 100%;
    margin: 1rem 0 0;
    background: #0A0E0C;
    border: none;
    outline: none;
    padding: 15px 0;
    border-radius: 0.5rem;
    color: #BFFFE5;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.1s ease-in-out, background 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
        background: #307452;
        color: white;
    }

    &:active {
        transform: scale(0.99)
    }
`

const Paragraph = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
`

const Login = () => {
    const [isInfo, setIsInfo] = useState(false)
    const [infoText, setInfoText] = useState([])
    const [infoColor, setInfoColor] = useState('#AF0000')
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordShowed, setIsPasswordShowed] = useState(false)

    const emailRef = useRef()
    const passRef = useRef()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const email = emailRef.current.value
        const password = passRef.current.value

        setIsInfo(false)
        setInfoText([])
        setIsLoading(false)

        if (!email || !password) {
            setInfoColor('#AF0000')
            setInfoText(oldState => [...oldState, 'One of the fields is empty!'])
            setIsInfo(true)
        } else {
            setIsLoading(true)
            axios({
                method: 'post',
                url: 'http://localhost:3000/api/auth/login',
                data: {
                    email,
                    password
                },

            })
                .then((res) => {
                    setIsLoading(false)
                    setIsInfo(true)
                    setInfoColor('#307452')
                    setInfoText(oldState => [...oldState, res.data.msg])

                    localStorage.setItem("user", JSON.stringify({
                        username: res.data.user.username,
                        token: `Bearer ${res.data.user.token}`
                    }))

                    setTimeout(() => navigate('/', { replace: true }), 1000)

                })
                .catch((err) => {
                    setIsLoading(false)
                    setIsInfo(true)
                    setInfoColor('#AF0000')
                    const error = err.response.data.msg.errors
                    if (error) {
                        for (const property in error) {
                            setInfoText(oldState => [...oldState, `${property}: ${error[property].message}`.split(": ")[1]]);
                        }
                    } else {
                        setInfoText(oldState => [...oldState, err.response.data.msg])
                    }

                })
        }

    }

    if (isInfo) {
        setTimeout(() => setIsInfo(false), 3000)
    }

    const showPassword = (e) => {
        e.preventDefault()
        setIsPasswordShowed(!isPasswordShowed)
        if (isPasswordShowed)
            passRef.current.type = 'text'
        else
            passRef.current.type = 'password'

    }

    useEffect(() => {
        return function cleanUp() {
        };
    }, []);

    return (
        <Background>
            <Header>
                <Container>
                    <Logo className="logo" />
                </Container>
            </Header>
            <Container>
                <ImageContainer>
                    <LoginImage className="register-image" />
                </ImageContainer>
                <FormContainer>
                    <TextContainer>
                        <Title>Log into your account</Title>
                        <Subtitle>And start sharing and creating posts.</Subtitle>
                        <Form onSubmit={handleSubmit}>
                            <InputContainer>
                                <EnvelopeIcon className="input-icon" />
                                <Input placeholder="Email" ref={emailRef}></Input>
                            </InputContainer>
                            <InputContainer>
                                <KeyIcon className="input-icon" />
                                <Input type="password" placeholder="Password" ref={passRef}></Input>
                                {isPasswordShowed ? <EyeShowIcon className="password-icon" onClick={showPassword} /> : <EyeHideIcon className="password-icon" onClick={showPassword} />}
                            </InputContainer>
                            {isInfo && <Info text={infoText} color={infoColor} />}
                            <Button>{isLoading ? 'Loading...' : 'Login'}</Button>
                        </Form>
                        <Paragraph>Don't have an account? <Link to="/auth/sign-up" className="link">Sign Up</Link></Paragraph>
                    </TextContainer>
                </FormContainer>
            </Container>
        </Background>
    )
}




export default Login
