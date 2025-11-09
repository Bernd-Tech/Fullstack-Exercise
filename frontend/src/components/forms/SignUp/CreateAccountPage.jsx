export const CreateAccountPage = ({ register, errors, watch }) => {
  return (
    <>
      <div className="flex flex-col gap-6 [&>div]:gap-8 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
        <div className="flex justify-between [&>div]:flex [&>div]:flex-1 [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              {...register("user.first_name", {
                required: false,
              })}
              id="firstName"
              type="text"
            />
            {/* Need to add optional chaining, because checking for firstName if errors.user doesn't exist yet will crash render*/}
            {/* {errors.user?.first_name && (
              <p className="text-red-500">{errors.user.first_name.message}</p>
            )} */}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("user.last_name", {
                required: false,
              })}
              id="lastName"
              type="text"
            />
            {/* {errors.user?.last_name && (
              <p className="text-red-500">{errors.user.last_name.message}</p>
            )} */}
          </div>
        </div>

        <div className="">
          <div className="flex flex-col gap-1 [&>input]:h-10 [&>input]:outline-0 [&>input]:input-style">
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

          {watch("user.pronouns") === "Other" && (
            <input
              className="mt-2"
              {...register("user.specific_prononuns", {
                required: "Please enter your specific pronouns.",
              })}
              id="specificPronouns"
              type="text"
              placeholder="Preferred pronouns..."
            />
          )}

          {errors.user?.specific_prononuns && (
            <p className="text-red-500">{errors.user.specific_prononuns.message}</p>
          )}
          </div>
        </div>

        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-1 [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
          <div>
            <label htmlFor="country">Country</label>
            <input
              {...register("user.country", {
                required: false,
              })}
              id="country"
              type="text"
            />
            {/* {errors.user?.country && (
              <p className="text-red-500">{errors.user.country.message}</p>
            )} */}
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input
              {...register("user.city", {
                required: false,
              })}
              id="city"
              type="text"
            />
            {/* {errors.user?.city && (
              <p className="text-red-500">{errors.user.city.message}</p>
            )} */}
          </div>
        </div>

      </div>
    </>
  );
};
