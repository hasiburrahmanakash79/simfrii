import { Link } from "react-router-dom";
import facebook from "../../assets/icons/facebook.svg";
import simFrii from "../../assets/logo/simFriiLogo.svg";
import insta from "../../assets/icons/insta.svg";
import twitter from "../../assets/icons/twitter.svg";
import youtube from "../../assets/icons/youtube.svg";
import location from "../../assets/icons/location.svg";
import email from "../../assets/icons/email.svg";
import call from "../../assets/icons/call.svg";
import banner from "../../assets/images/footer.svg";

const Footer = () => {
  return (
    <footer className="bg-white pt-7">
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 container mx-auto p-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div className="space-y-3">
              <div className="w-36">
                <Link to="/">
                  <img src={simFrii} alt="" />
                </Link>
              </div>
              <p className="text-gray-600 max-w-xs">
                SimFrii provides affordable and convenient global eSIM solutions for travelers and digital nomads worldwide.
              </p>
              <div className="flex space-x-4">
                <Link to="/">
                  <img src={facebook} alt="Facebook" />
                </Link>
                <Link to="/">
                  <img src={twitter} alt="Twitter" />
                </Link>
                <Link to="/">
                  <img src={insta} alt="Instagram" />
                </Link>
                <Link to="/">
                  <img src={youtube} alt="YouTube" />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">
              Popular Countries
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  United States
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  London
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  Canada
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  Australia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  Germany
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">About Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  Help
                </a>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <img src={location} alt="Location" />
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  44 Danwers, NY City, USA, 70-102
                </a>
              </li>
              <li className="flex items-center gap-2">
                <img src={email} alt="Email" className="shrink-0" />
                <a
                  href="mailto:simfrii@gmail.com"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors break-all"
                >
                  simfrii.contact@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <img src={call} alt="Call" />
                <a
                  href="https://hr-akash23.web.app"
                  className="text-gray-600 hover:text-[#FF962C] transition-colors"
                >
                  91+585-656-658
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="text-gray-500 text-sm text-center pt-28 pb-5"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="">
            © 2025 <span className="text-[#aa6320]">SimFrii</span>. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
