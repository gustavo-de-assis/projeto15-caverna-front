import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { StyledPage, StyledForm, StyledP } from "../../theme/Styles"

export default function SignUpPage() {

    const [userInfo, setUserInfo] = useState({name:"", email:"", password: ""})
    const navigate = useNavigate();

    
    function formHandler(e){
        const {name, value} = e.target;
        setUserInfo({...userInfo, [name]:value})
    }

    function signUpUser(e){
        e.preventDefault();

        //Gathering user info
        const newUser = {...userInfo};
        
        //Connecting to API
        const URL = 'http://localhost:5000/signUp';

        axios.post(URL, newUser).then((ans)=>{
            console.log("Cadastro realizado!", ans.data);
            navigate("/");
        }).catch((err)=>{
            console.log(err.response.data)
        })

    }

    return (
        <StyledPage>
            <StyledP>Sign-Up!</StyledP>
            <StyledForm onSubmit={signUpUser}>
                <input 
                    name="name"
                    type="text"
                    value={userInfo.name}
                    placeholder="Name"
                    onChange={formHandler}
                    required
                />
                <input
                    name="email"
                    type="email"
                    value={userInfo.email}
                    placeholder="Email"
                    onChange={formHandler}
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={userInfo.password}
                    placeholder="Password"
                    onChange={formHandler}
                    required
                />
                <button type="submit">
                    Continue
                </button>
            </StyledForm>

        </StyledPage>
    )

}