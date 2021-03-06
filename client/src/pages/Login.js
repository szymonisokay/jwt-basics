import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
// Image
import { ReactComponent as LoginImage } from "../images/LoginImage.svg"
// Icons
import { ReactComponent as EnvelopeIcon } from "../images/EnvelopeIcon.svg"
import { ReactComponent as KeyIcon } from "../images/KeyIcon.svg"
import { ReactComponent as EyeHideIcon } from "../images/EyeHideIcon.svg"
import { ReactComponent as EyeShowIcon } from "../images/EyeShowIcon.svg"
// Components
import Info from "../components/Info"
// Context
import { useAuthContext } from "../context/authContext"

const Background = styled.section`
  width: 100%;
  height: 100vh;
  background: #bfffe5;
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
  color: #4d6c5d;
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
  border: 2px solid #95ccb6;
  padding: 0 3rem;
  outline: none;
  background: none;
  color: #0a0e0c;
  border-radius: 0.5rem;

  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #0a0e0c;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #0a0e0c;
  }
  :-ms-input-placeholder {
    color: #0a0e0c;
  }
`

const Button = styled.button`
  display: block;
  width: 100%;
  margin: 1rem 0 0;
  background: #0a0e0c;
  border: none;
  outline: none;
  padding: 15px 0;
  border-radius: 0.5rem;
  color: #bfffe5;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out, background 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:hover {
    background: #307452;
    color: white;
  }

  &:active {
    transform: scale(0.99);
  }
`

const Paragraph = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
`

const Login = () => {
  const { signIn } = useAuthContext()

  const [isInfo, setIsInfo] = useState(false),
    [infoText, setInfoText] = useState([]),
    [infoType, setInfoType] = useState(),
    [isLoading, setIsLoading] = useState(false),
    [isPasswordShowed, setIsPasswordShowed] = useState(false)

  const emailRef = useRef(),
    passRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value,
      password = passRef.current.value

    setIsInfo(false)
    setInfoText([])
    setIsLoading(true)

    if (!email || !password) {
      return showInfo("One of the fields is empty!", "failed")
    }

    const { msg, type } = await signIn(email, password)
    return showInfo(msg, type)
  }

  const showInfo = (infoText, type) => {
    setIsInfo(true)
    setInfoText((oldState) => [...oldState, infoText])
    setInfoType(type)
    setIsLoading(false)
  }

  if (isInfo) {
    setTimeout(() => setIsInfo(false), 3000)
  }

  const showPassword = (e) => {
    e.preventDefault()
    setIsPasswordShowed(true)
    passRef.current.type = "text"
  }

  const hidePassword = (e) => {
    e.preventDefault()
    setIsPasswordShowed(false)
    passRef.current.type = "password"
  }

  useEffect(() => {
    return function cleanUp() {}
  }, [])

  return (
    <Background>
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
                <Input
                  type="password"
                  placeholder="Password"
                  ref={passRef}
                ></Input>
                {isPasswordShowed ? (
                  <EyeHideIcon
                    className="password-icon"
                    onClick={hidePassword}
                  />
                ) : (
                  <EyeShowIcon
                    className="password-icon"
                    onClick={showPassword}
                  />
                )}
              </InputContainer>
              {isInfo && <Info text={infoText} type={infoType} />}
              <Button>{isLoading ? "Loading..." : "Login"}</Button>
            </Form>
            <Paragraph>
              Don't have an account?{" "}
              <Link to="/auth/sign-up" className="link">
                Sign Up
              </Link>
            </Paragraph>
          </TextContainer>
        </FormContainer>
      </Container>
    </Background>
  )
}

export default Login
