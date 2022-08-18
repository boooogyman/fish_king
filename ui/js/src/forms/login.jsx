import {login}  from '../api_client/user'
import React, {useCallback, useState} from 'react';
import { useNavigate } from "react-router-dom";

export const LoginFormComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        let loginResult = await login(
            email,
            password,
        )

        if (loginResult){
            navigate("/home");
        }
      }, [email, password, navigate])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td><input
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /></td>
                        <td><label htmlFor='email'>Email</label></td>
                    </tr>
                    <tr>
                        <td><input
                            type="password"
                            value={password}
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                        /></td>
                        <td><label htmlFor='password'>Password</label></td>
                    </tr>
                    <tr>
                        <td><input type='submit'/></td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
