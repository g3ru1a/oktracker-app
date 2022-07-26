const en = {
    placeholders: {
        username: 'Username',
        email_address: 'Email Address',
        password: 'Password',
        password_confirm: 'Confirm Password'
    },
    buttons: {
        login: 'Login',
        register: 'Register'
    },
    errors: {
        empty: {
            username: 'Username cannot be blank.',
            email: 'Email address cannot be blank.',
            password: 'Password cannot be blank.',
            password_confirm: 'Password Confirmation cannot be blank',
        },
        bad_format: {
            email: 'Please enter a valid email address.',
            password_length: 'Password has to be at least 8 characters and maximum 30 characters.',
            password_match: 'Password confirmation does not match.',
            // eslint-disable-next-line
            password_content: "Password must contain at least one number and one special character {'\!\.\@\#\$\%\^\&\*'}",
        },
        bad_credentials: 'Email or Password does not match.',
        email_taken: 'This Email address is already registered.',
        username_taken: 'The Username is taken.'
    },
    messages: {
        forgot_password_link: 'Forgot Password?',
        register_link_1: 'Not Registered?',
        register_link_2: 'Create an Account',
        login_link: 'Go To Login',
    }
}

export default en;