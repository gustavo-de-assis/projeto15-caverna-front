import styled from "styled-components";

export const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledP = styled.p`
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    margin: 10px 0;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;

    input {
        width: 320px;
        height: 60px;
        border: 1px solid;
        border-radius: 5px;
        margin: 10px 0;
        text-indent: 5px;
    }

    button {
        width: 320 px;
        height: 60px;
        background-color: antiquewhite;
        border-radius: 5px;
        border: 1px solid;
    }
`;

export const StyledImg = styled.img`
    width: 300px;
`;

export const StyledButton = styled.button`
margin-top: 20px;
border: none;
background-color: rgba(0, 0, 0, 0);
`;