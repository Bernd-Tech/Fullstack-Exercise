import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/Button";
import { Link } from 'react-router-dom';

export const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
    }
  });

  

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const confirm = async () => {
    const isValid = await trigger();
    
    if (isValid) {
        const formData = getValues();
        console.log(getValues());
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-35 gap-12">
        <h1 className="text-5xl">Log in</h1>
        <div className="bg-(--color-dark) w-[50%] rounded-[40px] p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 [&>div]:gap-8 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">

        

        <div className="flex flex-col !gap-1">
          <label htmlFor="email">E-Mail*</label>
          <input
            {...register("user.email", {
              required: "Please enter your email address.",
            })}
            id="email"
            type="email"
          />
          {errors.user?.email && (
            <p className="text-red-500">{errors.user.email.message}</p>
          )}
        </div>

        <div className="flex flex-col !gap-1">
          <label htmlFor="password">Password*</label>
          <input
            {...register("user.password", {
              required: "Please create a password.",
              minLength: 8,
            })}
            id="password"
            type="password"
          />
          {errors.user?.password && (
            <p className="text-red-500">{errors.user.password.message}</p>
          )}
        </div>

       
      <div className="flex w-full justify-end">
            <Button type="button" onClick={confirm} text="Confirm" />
        </div>
        </div>
          </form>
        </div>
        <div>
            <p>Don't have an account yet? <Link className="border-b-1" to="/sign-up">Sign up</Link></p>
          </div>
      </div>
    </>
  );
};