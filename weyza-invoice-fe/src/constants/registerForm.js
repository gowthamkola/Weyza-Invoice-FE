const RegisterObjFormat = {
    inputItems: [
        {
            label: 'firstname',
            type: 'text',
            stateVar: 'fname',
            required: true,
            validate: false,
            maxLength: 25
        },
        {
            label: 'lastname',
            type: 'text',
            stateVar: 'lname',
            required: true,
            validate:false,
            maxLength: 25
        },
        {
            label: 'email',
            type: 'email',
            stateVar: 'email',
            required: false,
            validate: true,
            maxLength: 64
        },
        {
            label: 'password',
            type: 'password',
            stateVar: 'passwordPre',
            required: false,
            validate: true,
            maxLength: 30
        },
        {
            label: 'password',
            type: 'password',
            stateVar: 'passwordPre2',
            required: true,
            validate: true,
            maxLength: 30
        },
        {
            label: 'username',
            type: 'text',
            stateVar: 'userName',
            required: true,
            validate: false,
            maxLength: 15
        },
        {
            label: 'phone',
            type: 'text',
            stateVar: 'phone',
            required: true,
            validate: false,
            maxLength: 15
        }
    ],
    errorMessages: {
        requiredMessage: 'required field',
        invalidEmail: 'invalid email',
        invalidUserName: 'username Unavailable',
        invalidPhone: 'phone number INvalid',
        password: 'password must be a minimum of 9 characters',
        passwordMismatch: 'passwords did not match'
    }
}

export default RegisterObjFormat;