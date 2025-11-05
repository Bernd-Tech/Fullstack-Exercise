export const CreateAccountPage = ({ register, errors, getValues, watch }) => {
  return (
    <>
      <div className="flex flex-col gap-6 [&>div]:gap-8 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
        <div className="flex justify-between [&>div]:flex [&>div]:flex-1 [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="firstName">First Name*</label>
            <input
              {...register("user.first_name", {
                required: "Please enter your first name.",
              })}
              id="firstName"
              type="text"
            />
            {/* Need to add optional chaining, because checking for firstName if errors.user doesn't exist yet will crash render*/}
            {errors.user?.first_name && (
              <p className="text-red-500">{errors.user.first_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName">Last Name*</label>
            <input
              {...register("user.last_name", {
                required: "Please enter your last name.",
              })}
              id="lastName"
              type="text"
            />
            {errors.user?.last_name && (
              <p className="text-red-500">{errors.user.last_name.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-1 [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="preferredName">Preferred Name*</label>
            <input
              {...register("user.preferred_name", {
                required: "Please enter your preferred name.",
              })}
              id="preferredName"
              type="text"
            />

            {errors.user?.preferred_name && (
              <p className="text-red-500">{errors.user.preferred_name.message}</p>
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
              {...register("user.specific_prononuns", {
                required: "Please enter your specific pronouns.",
              })}
              id="specificPronouns"
              type="text"
              placeholder="Enter pronouns..."
            />
          )}

          {errors.user?.specific_prononuns && (
            <p className="text-red-500">{errors.user.specific_prononuns.message}</p>
          )}
        </div>

        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-1 [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
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

        <div className="flex flex-col !gap-1">
          <label htmlFor="confirmedPassword">Confirm Password*</label>
          <input
            {...register("user.confirmed_password", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === watch("user.password") || "Password must match.",
            })}
            id="confirmedPassword"
            type="password"
          />
          {errors.user?.confirmed_password && (
            <p className="text-red-500">{errors.user.confirmed_password.message}</p>
          )}
        </div>

        <div className="flex flex-col">
        <div className="flex items-center !gap-2">
          <input
            {...register("consent.service_understanding", {
              required: "This checkbox is required",
            })}
            type="checkbox"
            id="serviceUnderstanding"
          />
          <label htmlFor="serviceUnderstanding">I understand this is an AI-powered service, not human therapy.</label>
            </div>
          {errors.consent?.service_understanding && (
            <p className="text-red-500 indent-5.5">{errors.consent.service_understanding.message}</p>
          )}
        </div>
      </div>
    </>
  );
};
