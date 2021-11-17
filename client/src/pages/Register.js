import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// Image
import { ReactComponent as RegisterImage } from '../images/RegisterImage.svg'
// Icons
import { ReactComponent as PersonIcon } from '../images/PersonIcon.svg'
import { ReactComponent as EnvelopeIcon } from '../images/EnvelopeIcon.svg'
import { ReactComponent as KeyIcon } from '../images/KeyIcon.svg'
import { ReactComponent as EyeHideIcon } from '../images/EyeHideIcon.svg'
import { ReactComponent as EyeShowIcon } from '../images/EyeShowIcon.svg'
// Components
import Info from '../components/Info';
// Context
import { useAuthContext } from '../context/authContext'

const Background = styled.section`
    width: 100%;
    height: 100vh;
    background: #BFFFE5;
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

const Register = () => {
    const { signUp } = useAuthContext()

    const [isInfo, setIsInfo] = useState(false),
        [infoText, setInfoText] = useState([]),
        [infoType, setInfoType] = useState(),
        [isLoading, setIsLoading] = useState(false),
        [isPasswordShowed, setIsPasswordShowed] = useState(false)

    const usernameRef = useRef(),
        emailRef = useRef(),
        passRef = useRef(),
        confirmPassRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = usernameRef.current.value,
            email = emailRef.current.value,
            password = passRef.current.value,
            confirmPassword = confirmPassRef.current.value

        setIsInfo(false)
        setInfoText([])
        setIsLoading(true)

        if (!username || !email || !password || !confirmPassword) {
            return showInfo('One of the fields is empty!', 'failed')
        }

        if (password !== confirmPassword) {
            return showInfo('Passwords do not match!', 'failed')
        }

        const { msg, type } = await signUp(username, email, password)
        return showInfo(msg, type)
    }

    const showInfo = (infoText, type) => {
        setIsInfo(true)
        setInfoText(oldState => [...oldState, infoText])
        setInfoType(type)
        setIsLoading(false)
    }

    if (isInfo) {
        setTimeout(() => setIsInfo(false), 3000)
    }

    const showPassword = (e) => {
        e.preventDefault()
        setIsPasswordShowed(true)
        passRef.current.type = 'text'
    }

    const hidePassword = (e) => {
        e.preventDefault()
        setIsPasswordShowed(false)
        passRef.current.type = 'password'
    }

    useEffect(() => {
        return function cleanUp() {
        };
    }, []);

    return (
        <Background>
            <Container>
                <ImageContainer>
                    <RegisterImage className="register-image" />
                </ImageContainer>
                <FormContainer>
                    <TextContainer>
                        <Title>Create an account</Title>
                        <Subtitle>And jump into the world of posts.</Subtitle>
                        <Form onSubmit={handleSubmit}>
                            <InputContainer>
                                <PersonIcon className="input-icon" />
                                <Input placeholder="Username" ref={usernameRef}></Input>
                            </InputContainer>
                            <InputContainer>
                                <EnvelopeIcon className="input-icon" />
                                <Input placeholder="Email" ref={emailRef}></Input>
                            </InputContainer>
                            <InputContainer>
                                <KeyIcon className="input-icon" />
                                <Input type="password" placeholder="Password" ref={passRef}></Input>
                                {isPasswordShowed ? <EyeHideIcon className="password-icon" onClick={hidePassword} /> : <EyeShowIcon className="password-icon" onClick={showPassword} />}
                            </InputContainer>
                            <InputContainer>
                                <KeyIcon className="input-icon" />
                                <Input type="password" placeholder="Confirm password" ref={confirmPassRef}></Input>
                            </InputContainer>
                            {isInfo && <Info text={infoText} type={infoType} />}
                            <Button>{isLoading ? 'Loading...' : 'Register'}</Button>
                        </Form>
                        <Paragraph>Already have an account? <Link to="/auth/sign-in" className="link">Sign In</Link></Paragraph>
                    </TextContainer>
                </FormContainer>
            </Container>
        </Background>
    )
}




export default Register
