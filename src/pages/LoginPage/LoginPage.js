import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { loginUrl } from "../../constants/urls";

export default function LoginPage() {
    const [localUser, setLocalUser] = useState({ email: "", password: "" });
    const { setUser } = useContext(ProjectContext);
    const navigate = useNavigate()

    async function login(event) {
        event.preventDefault();
        try {
            const res = await axios.post(loginUrl, localUser);
            setUser(res.data)
            navigate('/main')
        } catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    }
    return (
        <StyledPage>
            <StyledImg src="https://i.imgur.com/knHSdSr.png" />
            <StyledP>Login</StyledP>
            <StyledForm onSubmit={login}>
                <input
                    type="email"
                    placeholder="Email"
                    value={localUser.email}
                    onChange={(e) =>
                        setLocalUser({ ...localUser, email: e.target.value })
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={localUser.password}
                    onChange={(e) =>
                        setLocalUser({ ...localUser, password: e.target.value })
                    }
                    required
                />
                <button type="submit">Entrar</button>
            </StyledForm>
            <Link to={"/signUp"}>
                <StyledButton>
                    Ainda não tenho uma conta. Criar uma!
                </StyledButton>
            </Link>
        </StyledPage>
    );
}

const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledImg = styled.img`
    width: 300px;
`;

const StyledP = styled.p`
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    margin: 10px 0;
`;

const StyledForm = styled.form`
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

const StyledButton = styled.button`
    margin-top: 20px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
`;
