export const SignUpPage1 = ({ register, errors, getValues }) => {
  return (
    <>
      <div className="flex flex-col gap-6 [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="firstName">First Name*</label>
            <input
              {...register("user.firstName", {
                required: "Please enter your first name.",
              })}
              id="firstName"
              type="text"
            />
            {/* Need to add optional chaining, because checking for firstName if errors.user doesn't exist yet will crash render*/}
            {errors.user?.firstName && (
              <p className="text-red-500">{errors.user.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName">Last Name*</label>
            <input
              {...register("user.lastName", {
                required: "Please enter your last name.",
              })}
              id="lastName"
              type="text"
            />
            {errors.user?.lastName && (
              <p className="text-red-500">{errors.user.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="preferredName">Preferred Name*</label>
            <input
              {...register("user.preferredName", {
                required: "Please enter your preferred name.",
              })}
              id="preferredName"
              type="text"
            />

            {errors.user?.preferredName && (
              <p className="text-red-500">{errors.user.preferredName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="age">Age*</label>
            <input
              {...register("user.age", {
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
            {errors.user?.age && <p className="text-red-500">{errors.user.age.message}</p>}
          </div>
        </div>

        <div className="flex flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <label htmlFor="pronouns">Pronouns</label>
          <select
            className="input-style"
            {...register("user.pronouns", { required: false })}
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
              {...register("user.specificPrononuns", {
                required: "Please enter your specific pronouns.",
              })}
              id="specificPronouns"
              type="text"
              placeholder="Enter pronouns..."
            />
          )}

          {errors.user?.specificPrononuns && (
            <p className="text-red-500">{errors.user.specificPrononuns.message}</p>
          )}
        </div>

        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="country">Country*</label>
            <input
              {...register("user.country", {
                required: "Please enter the country you live in.",
              })}
              id="country"
              type="text"
            />
            {errors.user?.country && (
              <p className="text-red-500">{errors.user.country.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="city">City*</label>
            <input
              {...register("user.city", {
                required: "Please enter the city you live in.",
              })}
              id="city"
              type="text"
            />
            {errors.user?.city && (
              <p className="text-red-500">{errors.user.city.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
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

        <div className="flex flex-col">
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

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            {...register("user.confirmPassword", {
              required: "Please confirm your password.",
              minLength: 8,
              validate: (value) =>
                value === getValues("user.password") || "Password must match.",
            })}
            id="password"
            type="password"
          />
          {errors.user?.confirmPassword && (
            <p className="text-red-500">{errors.user.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col">
        <div className="flex items-center !gap-2">
          <input
            {...register("consent.serviceUnderstanding", {
              required: "This checkbox is required",
            })}
            type="checkbox"
            id="serviceUnderstanding"
          />
          <label htmlFor="serviceUnderstanding">I understand this is an AI-powered service, not human therapy.</label>
            </div>
          {errors.consent?.serviceUnderstanding && (
            <p className="text-red-500 indent-5.5">{errors.consent.serviceUnderstanding.message}</p>
          )}
        </div>
      </div>
    </>
  );
};
