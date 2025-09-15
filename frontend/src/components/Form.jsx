import { useState } from "react";
import { Button } from "../components/Button";

export const Form = () => {
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

    const handleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    return (
        <>
        <form
                onChange={handleFormData}
                action=""
                className="flex flex-col gap-8 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-12 [&>div>input]:input-style"
              >
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">E-Mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="input-style"
                    name="message"
                    id="message"
                    value={formData.message}
                    required
                  ></textarea>
                </div>
                <div className="w-full flex items-center">
                  <Button text="Submit" />
                </div>
              </form>
        </>
    )
}