import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
  import {Link} from "react-router-dom";
   
  export function SimpleRegistrationForm() {

    const [formData,setFormData]=useState({
      Name:"",
      Email:"",
      Password:""

    });

  const handleChange=(e)=>{
    const target=e.target.name;
    if(target==="Name"){
   
        setFormData((prev)=>({
          ...prev,
          Name:e.target.value,
        }
        )
        )
    }
    else if(target==="Email"){
      setFormData((prev)=>({
        ...prev,
        Email:e.target.value,
      }
      )
      )
    }
    else if( target==="Password"){
      setFormData((prev)=>({
        ...prev,
        Password:e.target.value,
      }
      )
      )
    }

  }
    return (
        <div className='h-screen flex justify-center items-center'>
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
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
            <Typography variant="h6" color="blue-gray" className="-mb-3">
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
            <Typography variant="h6" color="blue-gray" className="-mb-3">
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
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth>
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