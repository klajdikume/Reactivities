import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../app/common/form/TextInput'

export const LoginForm = () => {
    return (
        <FinalForm 
            onSubmit={(values) => console.log(values)}
            render={({handleSubmit}) => (
                <Form>
                    <Field 
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field 
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                    />
                </Form>
            )}
        />
    )
}
