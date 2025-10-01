import { Link } from "react-router-dom";

const Footer = ({ isHome }) => {
  return (
    <footer className="bg-[#1D1D1D] max-w-[1400px] mx-auto text-white py-10 px-8 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Address Section */}
        <div className="">
          <img
            src="/footer/footer-logo.png"
            alt="DragSpace Logo"
            width={309}
            height={70}
          />
          <div className="mt-6 md:mt-[90px] text-[15px] font-spaceGrotesk space-y-1">
            <p className="flex items-center gap-1 lg:whitespace-nowrap">
              <img src="/footer/location.png" />
              2000 West Loop S, Suite 2200 <br />
              Houston, TX 77027
            </p>
            <p className="flex items-center gap-2">
              <img src="/footer/email.png" />
              info@dragspace.com
            </p>
            <p className="flex items-center gap-2">
              <img src="/footer/phone.png" />1 (844) 713-DRAG (3724)
            </p>
          </div>
          <h3 className="mt-12 text-[24px] font-bold capitalize">
            Check Out Our Socials!
          </h3>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=61574105501530" target="_blank" rel="noopener noreferrer">
              <img
                src="/footer/facebook.png"
                alt="Facebook"
                className="w-[9.98px] h-[27px] cursor-pointer"
              />
            </a>
            <a href="https://x.com/Yourdragspace" target="_blank" rel="noopener noreferrer">
              <img
                src="/footer/twitter.png"
                alt="Twitter"
                className="w-[18.61px] h-[27px] cursor-pointer"
              />
            </a>
            <a href="https://www.instagram.com/officialdragspace" target="_blank" rel="noopener noreferrer">
              <img
                src="/footer/instagram.png"
                alt="Instagram"
                className="w-[16.36px] h-[27px] cursor-pointer"
              />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold">Useful Links</h3>
          <ul className="mt-4 space-y-2 text-[15px] font-spaceGrotesk">
            <li className="flex flex-col">
              <Link to="/" className="flex items-center gap-4 cursor-pointer text-[#878787]" onClick={() => window.scrollTo(0, 0)}>
                <img src="/footer/arrow.png" alt="arrow" /> Home
              </Link>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li>
            <li className="flex flex-col">
              <Link to="/performers" className="flex items-center gap-4 cursor-pointer text-[#878787]" onClick={() => window.scrollTo(0, 0)}>
                <img src="/footer/arrow.png" alt="arrow" /> Performers
              </Link>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li>
            <li className="flex flex-col">
              <Link to="/venues" className="flex items-center gap-4 cursor-pointer text-[#878787]" onClick={() => window.scrollTo(0, 0)}>
                <img src="/footer/arrow.png" alt="arrow" /> Venues
              </Link>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li>
            <li className="flex flex-col">
              <Link to="/events" className="flex items-center gap-4 cursor-pointer text-[#878787]" onClick={() => window.scrollTo(0, 0)}>
                <img src="/footer/arrow.png" alt="arrow" /> Events
              </Link>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li>
            {/* <li className="flex flex-col">
              <div className="flex items-center gap-4 cursor-pointer text-[#878787]">
                <img src="/footer/arrow.png" alt="arrow" /> FAQ's
              </div>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li> */}
          </ul>
        </div>

        {/* Additional Social Links */}
        <div>
          <h3 className="text-xl font-bold">Connect With Us</h3>
          <div className="mt-4 space-y-4">
            <a href="https://www.instagram.com/officialdragspace" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-[#FF00A2] transition-colors">
              <img
                src="/footer/instagram.png"
                alt="Instagram"
                className="w-[16.36px] h-[27px]"
              />
              <span className="text-sm">Follow us on Instagram</span>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61574105501530" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-[#FF00A2] transition-colors">
              <img
                src="/footer/facebook.png"
                alt="Facebook"
                className="w-[9.98px] h-[27px]"
              />
              <span className="text-sm">Like us on Facebook</span>
            </a>
            <a href="https://x.com/Yourdragspace" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-[#FF00A2] transition-colors">
              <img
                src="/footer/twitter.png"
                alt="Twitter"
                className="w-[18.61px] h-[27px]"
              />
              <span className="text-sm">Follow us on Twitter</span>
            </a>
          </div>
        </div>
      </div>
     
     {isHome && 
        <div className="mt-8 py-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
            <span className="text-sm">DragSpace, LLC</span>
            <span className="text-sm">|</span>
            <Link to="/privacy" className="text-sm hover:text-[#FF00A2] underline" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
            <span className="text-sm">|</span>
            <Link to="/terms" className="text-sm hover:text-[#FF00A2] underline" onClick={() => window.scrollTo(0, 0)}>Terms And Conditions</Link>
          </div>
        </div>
        }
      
    </footer>
  );
};

export default Footer;
