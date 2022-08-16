const en = {
    placeholders: {
        username: 'Username',
        email_address: 'Email Address',
        password: 'Password',
        password_confirm: 'Confirm Password',
        verification_code: '0',
    },
    menu:{
        home: 'Home',
        collections: 'Collections',
        social: 'Social',
        account: 'Account',
        vendors: 'Vendors',
        settings: 'Settings',
        logout: 'Logout',
        discord: 'Discord',
        theme: 'Dark Theme',
    },
    buttons: {
        login: 'Login',
        register: 'Register',
        verify: 'Verify',
        loading: 'Loading...',
        go_to_login: 'Back to Login',
        request_password_reset: 'Request Password Reset',
        reset_password: 'Update Password',
        edit: 'Edit',
        delete: 'Delete',
        share: 'Share',
    },
    errors: {
        something_went_wrong: 'Something went wrong.',
        empty: {
            username: 'Username cannot be blank.',
            email: 'Email address cannot be blank.',
            password: 'Password cannot be blank.',
            password_confirm: 'Password Confirmation cannot be blank',
            code_digit: 'Cannot leave any digits blank.'
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
        username_taken: 'The Username is taken.',
        wrong_code: 'The code you entered is wrong.',
        email_not_found: 'The email entered is not registered.',
    },
    messages: {
        forgot_password_link: 'Forgot Password?',
        register_link_1: 'Not Registered?',
        register_link_2: 'Create an Account',
        login_link: 'Go To Login',
        check_email: 'You have been successfully registered! We sent a code to your email address, please confirm the address by entering the code below.',
        email_confirmed: 'Thank you for confirming your email address! You\'re all set to start tracking your collection. You\'ll be automatically redirected to the login page in 5 seconds, if it seems stuck please use the button below.',
        password_reset_check_email: 'An email with a verification code has been sent to the email address specified, please check your email and input the code below to reset your password.',
        password_reset: 'Your password has been reset successfully! You\'re all set to continue tracking your collection. You\'ll be automatically redirected to the login page in 5 seconds, if it seems stuck please use the button below.',
    }
}

export default en;