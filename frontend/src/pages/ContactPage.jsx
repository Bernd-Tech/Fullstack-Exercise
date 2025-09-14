import { useState } from "react";
import { Confirmation } from "../components/Confirmation";

export const ContactPage = () => {

   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
   });
    
   const handleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
      [name]: value,
    }));
   }

//    const [formConfirmed, setFormConfirmed] = useState(false)

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-black text-white pt-20 items-center gap-10 mt-16">
        <h1 className="text-2xl">Contact Page</h1>
        <p>
          Please feel free to contact us and we will get back to you as soon as
          we can.
        </p>

        <div className="flex flex-col w-[500px]">
            {/* {formConfirmed && <Confirmation />}  */}
          <form onChange={handleFormData} action="" className="flex flex-col gap-8 w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:bg-gray-400 [&>div>input]:h-7 [&>div>input]:text-black [&>div>input]:p-2">
            
            <div>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" value={formData.firstName} required/>
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" value={formData.lasttName} required/>
            </div>

            <div>
              <label htmlFor="email">E-Mail</label>
              <input id="email" name="email" type="email" value={formData.email} required/>
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea className="bg-gray-400 text-black p-2" name="message" id="message" value={formData.message} required></textarea>
            </div>
            <button type="submit" onClick={() => {}}>Send</button>
          </form>
        </div>
      </div>
    </>
  );
};
