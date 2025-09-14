import Spline from "@splinetool/react-spline";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";

export const Hero = () => {
  useGSAP(() => {
    gsap.to("#title", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "expo.out",
      delay: 0.3,
    });

    gsap.fromTo(
      "#subtitle",
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
        stagger: 0.1
      }
    );

    gsap.fromTo(
      "#spline-model",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        z: 20,
        duration: 4,
        ease: "expo.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <>
      <section
        id="hero-section"
        className="flex items-center w-screen h-screen pt-30 p-20"
      >
        <div className="flex w-full h-full">
          <div className="flex flex-col flex-1 gap-12 pl-20 pt-20 text-left">
            <h1
              id="title"
              className="text-7xl tracking-wide font-semibold opacity-0 linear-gradient"
            >
              Essentia AI
            </h1>
            <div className="pl-1.5 w-full flex flex-col gap-4">
                <p className="text-xl tracking-wide" id="subtitle">
                Essentia AI helps you look beyond surface worries and reach the core of your emotions.
              </p>
              <p className="text-xl tracking-wide" id="subtitle">
                Through weekly conversations, you'll gain insight into what's really holding you back.
              </p>
              <p className="text-xl tracking-wide" id="subtitle">
                Your personal path to clarity - anywhere, at your preferred
                time starts here.
              </p>
            </div>
          </div>
          <div className="rounded-3xl flex-2">
            <Spline
            id="spline-model"
              scene="https://prod.spline.design/OJ0TLV4hDBLNlB3y/scene.splinecode"
            />
            </div>
        </div>
      </section>
    </>
  );
};
