export const SignUpPage2 = ({ signUpData, updateSignUpData }) => {
  return (
    <>
      <form
        onChange={updateSignUpData}
        className="flex flex-col gap-8 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-12 [&>div>input]:input-style"
      >
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={signUpData.firstName}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={signUpData.lastName}
            required
          />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            value={signUpData.age}
            min={18}
            required
          />
        </div>

        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={signUpData.email}
            required
          />
        </div>

      </form>
    </>
  );
};