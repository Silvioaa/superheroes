import React from 'react';
import Container from '../../Components/Container';
import FormComponent from '../../Components/FormComponent';
import { login } from '../../redux/actions';
import store from '../../redux/store';

const Login = () => {

    const initialValues = {
        mail:"",
        pass:""
    }

    function submitFunction(values, { resetForm }){ 
        const loginData = {
            email: values.mail,
            password: values.pass,
            resetForm: resetForm
        }

        store.dispatch(login(loginData));
    }

    function validateFunction(values){
        let errors = {}
        if(!values.mail){
            errors.mail = "Por favor ingresar un e-mail para continuar."
        }
        if(!values.pass){
            errors.pass = "Por favor ingresa password para continuar."
        }
        return errors;
    }

    return(
        <Container>
            <h1 className="display-1 text-primary m-3 text-center">INICIAR SESIÓN</h1>
            <FormComponent
                initialValues={initialValues}
                submitFunction={submitFunction}
                validateFunction={validateFunction}
                submit="Ingresar"
            />
        </Container>
    );
}

export default Login;