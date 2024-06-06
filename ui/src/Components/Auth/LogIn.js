import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginAPI } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

   
  export function LoginCard() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
      email:"",
      password:""

    });
    const handleSubmit=(e)=>{

      
      const {email,password}=formData
  
      loginAPI(email,password,navigate,dispatch);

      

       
  
      }

    const handleChange=(e)=>{
      const target=e.target.name;
      if(target==="Email"){
        setFormData((prev)=>({
          ...prev,
          email:e.target.value,
        }
        )
        )
      }
      else if( target==="Password"){
        setFormData((prev)=>({
          ...prev,
          password:e.target.value,
        }
        )
        )
      }
  
    }
    return (
        <div className='h-screen flex items-center justify-center'>
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg"  name="Email"
              onChange={handleChange} />
          <Input label="Password" size="lg"  name="Password"
              onChange={handleChange}/>
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to="/SignUp">
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
      </div>
    );
  }