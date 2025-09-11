import Spline from "@splinetool/react-spline";

export const Hero = () => {
    return (
        <>
            <div className="flex w-auto h-screen bg-black">
                <div className="flex-2">
                    <div className="w-full mt-60 pl-30">
                    <p className="text-white text-2xl">Essentia AI, your personal path to clarity - anytime, anywhere. </p>
                    </div>
                </div>
                <div className="flex-3 pt-10">
                    <Spline scene="https://prod.spline.design/OJ0TLV4hDBLNlB3y/scene.splinecode" />
                </div>
            </div>
        </>
    )
}