import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
  import {Link} from "react-router-dom";
  import {signUpAPI} from "../../services/operations/authAPI"
  import { useNavigate} from "react-router-dom";
  
  export function SimpleRegistrationForm() {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
       username:"",
      email:"",
      password:""

    });

    const handleSubmit=(e)=>{

      
    const {username,email,password}=formData

      signUpAPI(username,email,password,navigate);
     

    }
  const handleChange=(e)=>{
    const target=e.target.name;
    if(target==="Name"){
   
        setFormData((prev)=>({
          ...prev,
          username:e.target.value,
        }
        )
        )
    }
    else if(target==="Email"){
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
        <div className='h-[80vh] flex justify-center items-center'>
       <Card className="p-5 mt-10">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>

        <form className="mt-2  w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-5">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Your Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              // value={formData.Name}
             
              name="Name"
              onChange={handleChange}
              value={formData.Name}
              
            />
            <Typography variant="h6" color="blue-gray" className="-mb-5">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="Email"
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-5">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="Password"
              onChange={handleChange}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleSubmit}>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/Login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
    );
  }