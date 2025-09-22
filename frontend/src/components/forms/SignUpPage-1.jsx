export const SignUpPage1 = ({ register, errors, getValues }) => {
  return (
    <>
      <div className="flex flex-col gap-6 [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="firstName">First Name*</label>
            <input
              {...register("firstName", {
                required: "Please enter your first name.",
              })}
              id="firstName"
              type="text"
            />

            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName">Last Name*</label>
            <input
              {...register("lastName", {
                required: "Please enter your last name.",
              })}
              id="lastName"
              type="text"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="preferredName">Preferred Name*</label>
            <input
              {...register("preferredName", {
                required: "Please enter your preferred name.",
              })}
              id="preferredName"
              type="text"
            />

            {errors.preferredName && (
              <p className="text-red-500">{errors.preferredName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="age">Age*</label>
            <input
              {...register("age", {
                required: "Please enter your age.",
                validateAsNumber: true,
                min: {
                  value: 18,
                  message: "You must be at least 18 years old.",
                },
              })}
              id="age"
              type="number"
              min={18}
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>
        </div>

        <div className="flex flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <label htmlFor="pronouns">Pronouns</label>
          <select
            className="input-style"
            {...register("pronouns", { required: false })}
            id="pronouns"
          >
            <option>Select Pronouns</option>
            <option>He/Him</option>
            <option>She/Her</option>
            <option>They/Them</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>

          {getValues("pronouns") === "Other" && (
            <input
              className="mt-2"
              {...register("specificPrononuns", {
                required: "Please enter your specific pronouns.",
              })}
              id="specificPronouns"
              type="text"
              placeholder="Enter pronouns..."
            />
          )}

          {errors.specificPrononuns && (
            <p className="text-red-500">{errors.specificPrononuns.message}</p>
          )}
        </div>

        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="country">Country*</label>
            <input
              {...register("country", {
                required: "Please enter the country you live in.",
              })}
              id="country"
              type="text"
            />
            {errors.age && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="city">City*</label>
            <input
              {...register("city", {
                required: "Please enter the city you live in.",
              })}
              id="city"
              type="text"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">E-Mail*</label>
          <input
            {...register("email", {
              required: "Please enter your email address.",
            })}
            id="email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password*</label>
          <input
            {...register("password", {
              required: "Please create a password.",
              minLength: 8,
            })}
            id="password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              minLength: 8,
              validate: (value) =>
                value === getValues("password") || "Password must match.",
            })}
            id="password"
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-center !gap-2">
          <input
            {...register("serviceUnderstanding", {
              required: true,
            })}
            type="checkbox"
          />
          <p>I understand this is an AI-powered service, not human therapy.</p>
        </div>
      </div>
    </>
  );
};
