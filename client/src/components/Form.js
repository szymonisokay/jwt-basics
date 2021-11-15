import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import Info from './Info'
// axios
const axios = require('axios')

const FormContainer = styled.form`
    max-width: 500px;
`

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 1rem !important;
`

const Textarea = styled.textarea`
    min-height: 50px;
    height: auto !important;
    width: 100%;
    resize: vertical;
    padding: 1rem !important;
`

const Button = styled.button`
    color: white;
`

const Form = () => {
    const [isInfo, setIsInfo] = useState(false),
        [infoColor, setInfoColor] = useState(''),
        [infoText, setInfoText] = useState([])

    const titleRef = useRef(),
        contentRef = useRef()

    let unmounted = false
    const source = axios.CancelToken.source()

    const getToken = () => {
        const token = JSON.parse(localStorage.getItem('user')).token
        return token
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setInfoText([])
        setIsInfo(false)

        const title = titleRef.current.value,
            content = contentRef.current.value

        if (!title || !content)
            return showInfo('One of the fields is empty!', '#AF0000')

        const token = getToken()

        await axios({
            method: 'post',
            url: 'http://localhost:3000/api/posts',
            data: {
                title,
                content
            },
            headers: {
                "Authorization": token
            },
            cancelToken: source.token
        }).then(res => {
            if (!unmounted)
                return showInfo(res.data.msg, '#307452')
        }).catch(err => {
            if (!unmounted)
                return showInfo(err.response.data.msg, '#AF0000')
        })
    }

    if (isInfo) {
        setTimeout(() => setIsInfo(false), 3000)
    }

    const showInfo = (text, color) => {
        setIsInfo(true)
        setInfoColor(color)
        setInfoText(oldInfo => [...oldInfo, text])
    }

    useEffect(() => {

        return function cleanup() {
            unmounted = true
            source.cancel("Cancel")
        }
    }, [])

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input className="form-input" placeholder="Title" ref={titleRef} />
            <Textarea className="form-input" rows="10" placeholder="Content" ref={contentRef} />
            {isInfo && <Info text={infoText} color={infoColor} />}
            <Button>Add post</Button>
        </FormContainer>
    )
}

export default Form
