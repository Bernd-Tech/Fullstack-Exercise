import { useState } from "react";
import { Button } from "./ui/Button";


const initialFormState = {
  firstName: "",
    lastName: "",
    email: "",
    message: ""
}

export const ContactForm = () => {

  const [contactFormData, setContactFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  console.log(contactFormData);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setContactFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(contactFormData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(contactFormData);
  }

  const resetForm = () => {
    setContactFormData(initialFormState);
    console.log(contactFormData);
    setSubmitted(false);
  }

    return (
        <>
        {submitted ? (
          <>
          <div className="h-full flex justify-center pt-24">
          <div className="flex flex-col items-center rounded-xl p-6 space-y-8">
          <h1 className="text-2xl">Thank you, we have received your message!</h1>
          <Button type="button" onClick={resetForm} text="Confirm"/>
          </div>
          </div>
          </>
        ) : (<>
        <form
                onSubmit={handleSubmit}
                action=""
                className="flex flex-col gap-8 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-12 [&>div>input]:input-style"
              >
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={contactFormData.firstName}
                    onChange={handleFormData}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={contactFormData.lastName}
                    onChange={handleFormData}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">E-Mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={contactFormData.email}
                    onChange={handleFormData}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="input-style h-24 resize-none"  
                    name="message"
                    id="message"
                    value={contactFormData.message}
                    onChange={handleFormData}
                    required
                  ></textarea>
                </div>
                <div className="w-full flex items-center">
                  <Button text="Submit" />
                </div>
              </form>
        </>)}
        </>
    )
}