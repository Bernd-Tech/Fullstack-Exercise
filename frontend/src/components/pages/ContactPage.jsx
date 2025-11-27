// import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Confirmation } from "../Confirmation";
import { Button } from "../ui/Button";
import { ContactForm } from "../forms/ContactForm";

export const ContactPage = () => {
  useGSAP(() => {
    gsap.fromTo(
      "#title",
      {
        x: -20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: "expo.out",
        duration: 1.5,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".subtitle",
      {
        x: -20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
        stagger: 0.1,
      }
    );
  }, []);

  //    const [formConfirmed, setFormConfirmed] = useState(false)

  return (
    <>
      <div className="flex flex-col w-full h-screen radial-gradient">
        <div className="flex flex-col gap-10 pt-35 p-40 w-full h-full">
          <h1 id="title" className="linear-gradient text-5xl">
            Get in Touch
          </h1>
          <div className="flex gap-12 xl:min-h-[520px]">
            <div className="flex flex-col justify-around flex-1 text-lg gap-18">
              <div className="flex flex-col gap-2 leading-6.2 pr-6">
                <p className="subtitle">
                  At Essentia AI, we believe everyone deserves access to
                  compassionate, judgementfree conversations.
                </p>
                <p className="subtitle">
                  Mental health support should be affordable, available and
                  stigmafree.
                </p>
                <p className="subtitle">
                Please feel free to contact us if you have anything to point out or ideas you would like to
                  share with us. We will get back to you as soon as we can.
                </p>
                <p className="subtitle">
                  We are looking forward to hear from you!
                </p>
              </div>
              <div className="flex flex-col gap-2 subtitle">
                <p className="text-sm">
                  If you prefer to not use the form, feel free to send us an
                  email.
                </p>
                <a
                  href="mailto:contact@essentia.ai"
                  className="hover:text-(--color-dark) duration-300 text-xl"
                >
                  contact@essentia.ai
                </a>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
