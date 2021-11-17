import React, { useRef, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components';
import { useAppRequestsContext } from '../context/appRequestsContext';
import Info from './Info'
import { useParams } from 'react-router-dom'


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
    const { createPost, getSinglePost, editPost } = useAppRequestsContext()
    const { id: postID } = useParams()

    const [isInfo, setIsInfo] = useState(false),
        [infoType, setInfoType] = useState(''),
        [infoText, setInfoText] = useState([])

    const titleRef = useRef(),
        contentRef = useRef()

    const fetchPost = useCallback(async () => {
        const response = await getSinglePost(`posts/${postID}`)

        setInputData(response.data.post)
    }, [getSinglePost, postID])


    const setInputData = ({ title, content }) => {
        titleRef.current.value = title
        contentRef.current.value = content
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setInfoText([])
        setIsInfo(false)

        const title = titleRef.current.value,
            content = contentRef.current.value

        if (!title || !content)
            return showInfo('One of the fields is empty!', '#AF0000')

        try {
            let response
            if (method === 'edit')
                response = await editPost(`posts/${postID}`, title, content)
            else
                response = await createPost('posts', title, content)

            return showInfo(response.data.msg, 'success')
        } catch (error) {
            return showInfo(error.response.data.msg, 'failed')
        }

        // console.log(title, content)

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
        if (method === 'edit')
            return fetchPost()
    }, [method, fetchPost])

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
