import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import { useAppRequestsContext } from '../context/appRequestsContext';
import Info from './Info'


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

const Form = ({ method }) => {
    const { createPost } = useAppRequestsContext()

    const [isInfo, setIsInfo] = useState(false),
        [infoType, setInfoType] = useState(''),
        [infoText, setInfoText] = useState([])

    const titleRef = useRef(),
        contentRef = useRef()



    const handleSubmit = async (e) => {
        e.preventDefault()

        setInfoText([])
        setIsInfo(false)

        const title = titleRef.current.value,
            content = contentRef.current.value

        if (!title || !content)
            return showInfo('One of the fields is empty!', '#AF0000')

        try {
            const response = await createPost('posts', title, content)
            return showInfo(response.data.msg, 'success')
        } catch (error) {
            return showInfo(error.response.data.msg, 'failed')
        }

    }

    if (isInfo) {
        setTimeout(() => setIsInfo(false), 3000)
    }

    const showInfo = (text, type) => {
        setIsInfo(true)
        setInfoType(type)
        setInfoText(oldInfo => [...oldInfo, text])
    }

    useEffect(() => {

    })

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input className="form-input" placeholder="Title" ref={titleRef} />
            <Textarea className="form-input" rows="10" placeholder="Content" ref={contentRef} />
            {isInfo && <Info text={infoText} type={infoType} />}
            <Button>{method === 'edit' ? 'Edit post' : 'Add post'}</Button>
        </FormContainer>
    )
}

export default Form
