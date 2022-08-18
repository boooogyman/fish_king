import {createUser}  from '../api_client/user'
import React, {useCallback, useState} from 'react';

export const CreateUserFormComponent = (callback, deps) => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        await createUser({
            email,
            phone,
            firstName,
            lastName,
            password,
        })
    }, [email, phone, firstName, lastName, password])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td><input name='email' onChange={(e) => setEmail(e.target.value)}/></td>
                        <td><label htmlFor='email'>Email</label></td>
                    </tr>
                    <tr>
                        <td><input name='first_name' onChange={(e) => setFirstName(e.target.value)}/></td>
                        <td><label htmlFor='first_name'>First name</label></td>
                    </tr>
                    <tr>
                        <td><input name='last_name' onChange={(e) => setLastName(e.target.value)}/></td>
                        <td><label htmlFor='last_name'>Last name</label></td>
                    </tr>
                    <tr>
                        <td><input name='phone' onChange={(e) => setPhone(e.target.value)}/></td>
                        <td><label htmlFor='phone'>Last name</label></td>
                    </tr>
                    <tr>
                        <td><input name='password' onChange={(e) => setPassword(e.target.value)}/></td>
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
