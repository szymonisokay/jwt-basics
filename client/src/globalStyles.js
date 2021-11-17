import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    .form-input {
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
    }

    button {
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
    }

    .preview-image {
        border-radius: 100%;
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
`

export default GlobalStyle