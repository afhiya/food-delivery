"use client"
import Link from "next/link";
import Form from "../ui/Form";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault()
    setLoading(true)
    const form = event.target as HTMLFormElement
    const data = {
      name : form.fullname.value,
      email : form.email.value,
      password : form.password.value
    }

    const response = await fetch("/api/user",{
      method :"POST",
      body : JSON.stringify(data)
    })

    const result = await response.json()
    form.fullname.value = ""
    form.email.value = ""
    form.password.value = ""
    if(result.status === 200){
      setMessage(result.message)
      setLoading(false)
      setError(false)
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000);
    } else {
      setError(true)
      setMessage(result.message)
      setLoading(false)
      setTimeout(() => {
        setMessage("")
      },3000);
    } 
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={`absolute top-10 text-sm font-semibold ${error ? "text-red-500" : "text-green-500"}`} >{message}</h2>
      <Form
        title="Fullname"
        name="fullname"
        placeholder="Fullname"
        type="text"
      />
      <Form title="Email" name="email" placeholder="Email" type="email" />
      <Form
        title="Password"
        name="password"
        placeholder="Password"
        type="password"
      />
      <p className="text-sm font-semibold text-center mt-2">
        Have account?{" "}
        <Link
          href="/auth/login"
          className="underline text-primary hover:text-muted transition-all"
        >
          Login here
        </Link>
      </p>

      <Button size="sm" variant="default" className="mt-3 w-full" type="submit">
        {loading ? "Loading..." : "Register"}
      </Button>
    </form>
  );
};

export default FormRegister;
