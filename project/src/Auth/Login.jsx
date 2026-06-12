import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { loginAPI } from "../Services/allAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const[loginInput,setloginInput]=useState({
    email:"",
    password:""
  })
  console.log(loginAPI);
  const navigate=useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()

    const{email,password}=loginInput
    console.log(loginInput);


     if (email && password) {
            // toast.success('Do api call')

            const result = await loginAPI(loginInput)
            console.log(result);    
            setTimeout(() => {

                if (result.status == 200) {
                    toast.success('login successfull')
                    sessionStorage.setItem("user", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)

                  navigate('/')
                }
            }, 2500)

        }
        else if (result.status == 401) {
            toast.warning(result.response.data)
            setloginInput({
                
                email: "",
                password: ""

            })

        }
        else if (result.status == 404) {
            toast.warning(result.response.data)
            setloginInput({
                
                email: "",
                password: ""

            })

        }

        else {
            toast.warning("Enter the form completely...")
            setloginInput({
               
                email: "",
                password: ""

            })
        }
    
  }

  

  return (
    <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">

        <div className="flex flex-col justify-center items-center p-8 md:p-12">

          <h1 className="text-3xl md:text-4xl font-bold text-[#F4A300] mb-8">
            Sign In to <br /> Your Account

          </h1>

          <div className="w-full max-w-sm space-y-5">

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input onChange={(e)=>setloginInput({...loginInput,email:e.target.value})}
                type="email"
                placeholder="Email"
                className="w-full bg-gray-100 py-3 pl-12 pr-4 rounded-md outline-none focus:ring-2 focus:ring-[#F4A300]"
              />
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input onChange={(e)=>setloginInput({...loginInput,password:e.target.value})}
                type="password"
                placeholder="Password"
                className="w-full bg-gray-100 py-3 pl-12 pr-4 rounded-md outline-none focus:ring-2 focus:ring-[#F4A300]"
              />
            </div>

            <p className="text-center text-sm text-gray-500 cursor-pointer hover:text-[#F4A300]">
              Forgot your password?
            </p>

            <button onClick={(e)=>handleLogin(e)} className="block mx-auto w-[200px] bg-[#F4A300] hover:bg-[#dc9300] text-white py-3 rounded-full font-semibold transition-all duration-300">
              SIGN IN
            </button>

          </div>
        </div>

        <div className="bg-[#003F63] text-white flex flex-col justify-center items-center p-8 md:p-12">

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Hello, Friend!
          </h2>

          <p className="text-center max-w-xs mb-8 text-gray-200">
            Enter your personal details and start your journey with us
          </p>

<Link to='/register'>
          <button className="border-2 border-white px-10 py-3 rounded-full font-semibold hover:bg-white hover:text-[#003F63] transition-all duration-300">
            SIGN UP
          </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Login;