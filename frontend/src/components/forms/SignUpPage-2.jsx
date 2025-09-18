export const SignUpPage2 = ({ register, errors, getValues }) => {
  return (
    <>
      <div className="flex flex-col gap-8 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-12 [&>div>input]:input-style">
        <div>
          <label htmlFor="preferredName">Preferred Name*</label>
          <input
            {...register("preferredName", { required: "Please enter your preferred name." })}
            id="preferredName"
            type="text"
          />

          {errors.preferredName && (
            <p className="text-red-500">{errors.preferredName.message}</p>
          )}
        </div>

        <div className="gap-8">
          <label htmlFor="pronouns">Pronouns</label>
          <select className="input-style"
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

          {getValues("pronouns") === "Other" && 
            <input
            {...register("specificPrononuns", { required: "Please enter your specific pronouns." })}
            id="specificPronouns"
            type="text"
            placeholder="Enter pronouns..."
          />
          }

          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country">Country*</label>
          <input
            {...register("country", {
              required: "Please enter the country you live in.",
            })}
            id="country"
            type="text"
          />
          {errors.age && <p className="text-red-500">{errors.country.message}</p>}
        </div>

        <div>
          <label htmlFor="city">City*</label>
          <input
            {...register("city", { required: "Please enter the city you live in." })}
            id="city"
            type="text"
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
    </div>
    </>
  );
};
