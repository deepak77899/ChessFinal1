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
   
  export function LoginCard() {
    const [formData,setFormData]=useState({
      Email:"",
      Password:""

    });
    const handleChange=(e)=>{
      const target=e.target.name;
      if(target==="Email"){
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
          <Button variant="gradient" fullWidth>
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