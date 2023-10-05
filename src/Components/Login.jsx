import { Link, NavLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from 'axios';
import * as Yup from "yup";
import picBgLogin from '../../src/assets/395434.jpg';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export function SignIn() {
  const navigate = useNavigate();

  const [wronghandle, setWronghandle] = useState(false);
  console.log(wronghandle)



  const handleSubmit = (values) => {


    const { username, password } = values;

    console.log(username)

    let config = {
      method: 'post',
      url: 'https://api.hexarz.com/v1/api/manage/blogadmin/login',
      data: {
        password: password,
        username: username
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data.data);
        window.localStorage.setItem("token", response.data.data.token)
        // window.localStorage.setItem("refreshtoken", response.data.data.refreshtoken);
        console.log('token:',response.data.data.token)
        navigate("/home/dashboard")
      })
      .catch((error) => {
        console.log(error.toString());
        console.log("error vorod")
        setWronghandle(true);
      });
  };

  const initialValues = {
    username: '',
    password: '',
  };


  const validationSchema = Yup.object({
    username: Yup.string().required('پر کردن این فیلد اجباری است'),
    password: Yup.string().required('پر کردن این فیلد اجباری است'),
  });

  return (
    <>
      <img
        src={picBgLogin}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography className="font-yekan" variant="h3" color="white">
              ورود
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-20">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col gap-5">
                <Field
                  type="text"
                  id="username"
                  name="username"
                  as={Input}
                  label="نام کاربری"
                  size="lg"
                  placeholderTextColor="#444"
                  textContentType="emailAddress"
                  autoFocus={true}
                  autoCapitalize="none"
                />
                <ErrorMessage name="username" component="div" className="text-red-500" />
                <Field
                  type="password"
                  id="password"
                  name="password"
                  as={Input}
                  label="رمز عبور"
                  size="lg"
                  placeholderTextColor="#444"
                  textContentType=""
                  secureTextEntry={true}
                  autoCorrect={false}
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
                {
                  wronghandle ? <p className="text-red-500"> نام کاربری یا پسورد اشتباه است</p>
                    : null
                }
                <div className="-ml-2.5">
                  <Checkbox label="Remember Me" />
                </div>
                <Button
                  type="submit"
                  variant="gradient"
                  fullWidth
                  className="font-yekan"
                >
                  ورود ادمین
                </Button>
              </Form>
            </Formik>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default SignIn;