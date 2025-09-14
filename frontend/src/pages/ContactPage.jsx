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
      <div className="flex flex-col w-full h-screen radial-gradient">
        <div className="flex flex-col gap-10 p-40 w-full h-full">
        <h1 className="text-2xl">Get in Touch</h1>
        <div className="flex gap-12">
        <div className="flex flex-col flex-1">
        <p>
          At Essentia AI, we believe everyone deserves access to compassionate, judgementfree conversations.
        </p>
        <p>
          Mental health support should be affordable, available and stigmafree.
        </p>
        <p>
            If you have anything to point out or ideas you would like to share with - please feel free to contact us and we will get back to you as soon as we can.
        </p>
        <p>We are looking forward to hear from you!</p>
        </div>
        <div className="flex flex-col flex-1">
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
            <button type="submit" onClick={() => {}}>Submit</button>
          </form>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
