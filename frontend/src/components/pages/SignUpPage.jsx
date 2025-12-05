import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase-client";

export const SignUpPage = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async () => {
    const formData = getValues();
    console.log("Form data:", formData);
    console.log("Metadata being sent:", {
      preferred_name: formData.user.preferred_name,
      email: formData.user.email,
      age_range: formData.user.age_range,
      service_agreement: formData.consent.service_agreement,
    });
    
    const { data, error } = await supabase.auth.signUp({
      email: formData.user.email,
      password: formData.user.password,
      options: {
        data: {
          preferred_name: formData.user.preferred_name,
          email: formData.user.email,
          age_range: formData.user.age_range,
          service_agreement: formData.consent.service_agreement,
        },
      },
    });

    console.log("Supabase response:", { data, error });
    if (error) {
      console.error("Error signing up: ", error.message);
      console.error("Full error object:", error);
      return;
    }
    setAuthenticated(true);
  };

  return (
    <>
    <div className="h-screen w-full flex items-center justify-center radial-gradient">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-3">
            <Link to="/">
              <h1 className="font-semibold linear-gradient text-5xl">
                Essentia AI
              </h1>
            </Link>
            <h1 className="text-2xl font-medium">Create a new account</h1>
            </div>
          {isAuthenticated ? (
          <>
            <div className="text-2xl pt-12">Please verify you email</div>
          </>
        ) : (
          <>
            <div className="p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-6 [&>div]:gap-8 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
                  <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-1 [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
                    <div>
                      <label htmlFor="preferredName">Preferred Name</label>
                      <input
                        {...register("user.preferred_name", {
                          required: "Please enter your preferred name.",
                        })}
                        id="preferredName"
                        type="text"
                        placeholder="Your preferred name..."
                      />

                      {errors.user?.preferred_name && (
                        <p className="text-red-500">
                          {errors.user.preferred_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="age">Age</label>
                      <select
                        className="input-style h-10"
                        {...register("user.age_range", {
                          required: "Please select your range of age.",
                        })}
                        id="age"
                        defaultValue=""
                      >
                        <option disabled value="">
                          Select Age
                        </option>
                        <option>18 - 24</option>
                        <option>25 - 34</option>
                        <option>35 - 44</option>
                        <option>45 - 54</option>
                        <option>55 - 64</option>
                        <option>64+</option>
                      </select>
                      {errors.user?.age_range && (
                        <p className="text-red-500">
                          {errors.user.age_range.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col !gap-1">
                    <label htmlFor="email">E-Mail</label>
                    <input
                      {...register("user.email", {
                        required: "Please enter your email address.",
                      })}
                      id="email"
                      type="email"
                      placeholder="Your email address..."
                    />
                    {errors.user?.email && (
                      <p className="text-red-500">
                        {errors.user.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col !gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                      {...register("user.password", {
                        required: "Please create a password.",
                        minLength: 8,
                      })}
                      id="password"
                      type="password"
                      placeholder="Your password..."
                    />
                    {errors.user?.password && (
                      <p className="text-red-500">
                        {errors.user.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col !gap-1">
                    <label htmlFor="confirmedPassword">Confirm Password</label>
                    <input
                      {...register("user.confirmed_password", {
                        required: "Please confirm your password.",
                        validate: (value) =>
                          value === watch("user.password") ||
                          "Password must match.",
                      })}
                      id="confirmedPassword"
                      type="password"
                      placeholder="Confirm your password..."
                    />
                    {errors.user?.confirmed_password && (
                      <p className="text-red-500">
                        {errors.user.confirmed_password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col !gap-1">
                    <div className="flex items-center !gap-2">
                      <input
                        {...register("consent.service_agreement", {
                          required: "This checkbox is required",
                        })}
                        type="checkbox"
                        id="serviceAgreement"
                      />
                      <label htmlFor="serviceAgreement">
                        I understand this is an AI-powered service, not human
                        therapy.
                      </label>
                    </div>
                    {errors.consent?.service_agreement && (
                      <p className="text-red-500">
                        {errors.consent.service_agreement.message}
                      </p>
                    )}
                  </div>
                </div>
                
                  <Button type="submit" text="Confirm" />
              </form>
            </div>
            <div>
              <p className="text-lg">
                Already have an account?{" "}
                <Link className="hover:text-(--color-dark) duration-300" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};
