import { Link } from 'react-router-dom';
import Spline from "@splinetool/react-spline";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { Button } from "./ui/Button";

export const Hero = () => {

    const timeline = gsap.timeline();

    useGSAP(() => {
        timeline.to('#title', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.3,
        })
    
        timeline.to('.subtitle', {
            y: 0,
        opacity: 1,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.1
        }, "-=0.6")

        timeline.to('.cta-container', {
            y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        }, "-=1.3")

        timeline.to('#spline-model', {
        opacity: 1,
        z: 20,
        duration: 1,
        ease: "expo.inOut"
        }, "-=2")
    }, [])

//   useGSAP(() => {
//     gsap.to("#title", {
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       ease: "expo.out",
//       delay: 0.3,
//     });

//     gsap.fromTo(
//       "#subtitle",
//       {
//         y: 20,
//         opacity: 0,
//       },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "expo.out",
//         delay: 0.5,
//         stagger: 0.1
//       }
//     );

//     gsap.fromTo(
//       "#spline-model",
//       {
//         opacity: 0,
//       },
//       {
//         opacity: 1,
//         z: 20,
//         duration: 4,
//         ease: "expo.out",
//         delay: 0.3,
//       }
//     );
//   }, []);

  return (
    <>
      <section
        id="hero-section"
        className="flex items-center w-full h-screen pt-30 p-20 radial-gradient rounded-b-[60px]"
      >
        <div className="flex w-full h-full glass-effect2 rounded-b-[60px]">
          <div className="flex flex-col flex-1 gap-8 pl-20 pt-20 text-left">
            <h1
              id="title"
              className="text-7xl tracking-wide font-semibold opacity-0 linear-gradient"
            >
              Essentia AI
            </h1>
            <div className="pl-1.5 w-full flex flex-col gap-4 [&>p]:translate-y-20 [&>p]:opacity-0 ">
                <p className="subtitle text-xl tracking-wide">
                Essentia AI helps you look beyond surface worries and reach the core of your emotions.
              </p>
              <p className="subtitle text-xl tracking-wide">
                Through weekly conversations, you'll gain insight into what's really holding you back.
              </p>
              <p className="subtitle text-xl tracking-wide">
                Your personal path to clarity - anywhere, at your preferred
                time starts here.
              </p>
            </div>
            <div className="flex gap-4 pl-1.5 opacity-0 cta-container">
            <Link to="/sign-up"><Button text="Get started" className="cta-btn" /></Link>
            <Button text="Read more" className="cta-btn" />
            </div>
          </div>
          <div className="rounded-3xl flex-2">
            <Spline
            id="spline-model" className="opacity-0"
              scene="https://prod.spline.design/OJ0TLV4hDBLNlB3y/scene.splinecode"
            />
            </div>
        </div>
      </section>
    </>
  );
};
