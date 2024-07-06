import Link from "next/link";
import Form from "../ui/Form";

const FormRegister = () => {
  return (
    <>
      <Form
        title="Fullname"
        name="fullname"
        placeholder="Fullname"
        type="text"
      />
      <Form 
      title="Email" 
      name="email" 
      placeholder="Email" 
      type="email" 
      />
      <Form
        title="Password"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Form
        title="Confirm Password"
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
    </>
  );
};

export default FormRegister;
