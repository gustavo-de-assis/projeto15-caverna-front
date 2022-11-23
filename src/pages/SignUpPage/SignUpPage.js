import { useState } from "react"
import { StyledPage, StyledForm, StyledP } from "../../theme/Styles"

export default function SignUpPage() {

    const [userInfo, setUserInfo] = useState({name:"", email:"", password: ""})
    
    function formHandler(e){
        const {name, value} = e.target;
        setUserInfo({...userInfo, [name]:value})
    }

    function signUpUser(e){
        e.preventDefault();
        console.log(userInfo);
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