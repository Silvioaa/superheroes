import React, { useContext } from 'react';
import { Validation } from '../../routes/Routes';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const Login = () => {
    const { token, setToken }= useContext(Validation);

    return(
        <>
        <div className="container">
            <h1>INICIAR SESIÓN</h1>
            <Formik
                initialValues={{
                    mail:"",
                    pass:""
                }}
                onSubmit={(values, { resetForm })=>{ 
                    axios({
                        method:"post",
                        url:"http://challenge-react.alkemy.org/",
                        data:{
                            email: values.mail,
                            password: values.pass
                        }
                    })
                    .then((res)=>{
                        localStorage.setItem("loginToken", res.data.token);
                        setToken(res.data.token);
                    })
                    .catch((err)=>{
                        alert(err);
                        resetForm();
                    });
                }}
                validate={(values)=>{
                    let errors = {}
                    if(!values.mail){
                        errors.mail = "Por favor ingresar un e-mail para continuar."
                    }
                    if(!values.pass){
                        errors.pass = "Por favor ingresa una contraseña para continuar."
                    }
                    return errors;
                }}
            >
                {({errors})=>(
                    <Form>
                        <div>
                            <Field 
                                name="mail" 
                                type="text" 
                            />
                        </div>
                        <div className="error">
                            <ErrorMessage name="mail" component={()=>(<span className="text-danger">{errors.mail}</span>)}/>
                        </div>
                        <div>
                            <Field 
                                name="pass"
                                type="password" 
                            />
                        </div>
                        <div className="error">
                            <ErrorMessage name="pass" component={()=>(<span className="text-danger">{errors.pass}</span>)}/>
                        </div>
                        <input type="submit" value="Ingresar"/>
                    </Form>)
                }   
            </Formik>
        </div>
        </>
    );
}

export default Login;