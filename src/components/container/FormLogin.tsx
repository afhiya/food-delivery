"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import Form from "../ui/Form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const login = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (!login?.error) {
      setLoading(false);
      form.reset();
      setError(null);
      router.push("/");
    } else {
      setLoading(false);
      form.reset();
      setError("Wrong email or password");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <h2 className="absolute top-0 text-sm font-semibold text-red-500">
          {error}
        </h2>
      )}
        <Form title="Email" name="email" placeholder="Email" type="email" />
        <Form
          title="Password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button
          size="sm"
          variant="default"
          className="mt-3 w-full"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </Button>
    </form>
  );
};

export default FormLogin;
