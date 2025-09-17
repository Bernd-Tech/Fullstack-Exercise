// export const SignUpPage2 = ({ signUpData, updateSignUpData }) => {
//   return (
//     <>
//       <form
//         onChange={updateSignUpData}
//         className="flex flex-col gap-8 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-12 [&>div>input]:input-style"
//       >
//         <div>
//           <label htmlFor="firstName">First Name</label>
//           <input
//             id="firstName"
//             name="firstName"
//             type="text"
//             value={signUpData.firstName}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             id="lastName"
//             name="lastName"
//             type="text"
//             value={signUpData.lastName}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="age">Age</label>
//           <input
//             id="age"
//             name="age"
//             type="number"
//             value={signUpData.age}
//             min={18}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="email">E-Mail</label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={signUpData.email}
//             required
//           />
//         </div>

//       </form>
//     </>
//   );
// };

export const SignUpPage2 = ({ register, errors, getValues }) => {
  return (
    <>
      <div className="flex flex-col gap-8 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-12 [&>div>input]:input-style">
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            {...register("firstName", { required: "Please enter your first name." })}
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
            {...register("lastName", { required: "Please enter your last name." })}
            id="lastName"
            type="text"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="age">Age*</label>
          <input
            {...register("age", {
              required: "Please enter your age." ,
              min: 18,
              validate: (value) => value >= 18 || "You must be at least 18 years old.",
            })}
            id="age"
            type="number"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div>
          <label htmlFor="email">E-Mail*</label>
          <input
            {...register("email", { required: "Please enter your email address." })}
            id="email"
            type="email"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password*</label>
          <input
            {...register("password", { 
                required: "Please create a password.",
                minLength: 8 
            })}
            id="password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
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
      </div>
    </>
  );
};
