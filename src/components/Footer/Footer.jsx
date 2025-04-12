import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/host-register");
  };
  return (
    <>
      <div className="flex mt-[50px] w-full max-w-[1140px] items-stretch gap-5 font-poppins text-primary font-medium flex-wrap justify-between max-md:max-w-full max-md:mt-10">
        <a href="/" className="text-[26px] cursor-pointer">
          <span className="text-accent">Homies</span>
          <span>Stay.</span>
        </a>

        <div className="text-lg mt-auto mb-auto">Become hotel Owner</div>
      </div>

      <div className="flex mt-2 w-full max-w-[1140px] items-stretch gap-5 font-poppins flex-wrap justify-between max-md:max-w-full">
        <div className="text-[#B0B0B0] text-base font-light">
          <span>We kaboom your beauty holiday</span>
          <br />
          <span>instantly and memorable.</span>
        </div>

        <button
          className="rounded-[5px] bg-accent mt-2 px-[25px] py-2 text-sm text-white font-medium ml-auto max-md:px-5 hover:bg-blue-700 active:bg-blue-800 active:shadow-sm active:translate-y-0.5 transition-all duration-200 cursor-pointer"
          onClick={handleRegisterClick}
        >
          Register Now
        </button>
      </div>

      {/* Footer content ends here */}
    </>
  );
}

export default Footer;
