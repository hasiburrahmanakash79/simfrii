import { Link } from "react-router-dom";
import facebook from "../../assets/icons/facebook.svg";
import insta from "../../assets/icons/insta.svg";
import twitter from "../../assets/icons/twitter.svg";
import youtube from "../../assets/icons/youtube.svg";
import location from "../../assets/icons/location.svg";
import email from "../../assets/icons/email.svg";
import call from "../../assets/icons/call.svg";

const Footer = () => {
  return (
    <footer className="bg-white md:pt-16 pt-7 container mx-auto">
      <div className="px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
            <div className="space-y-3">
              <div className="text-2xl font-bold text-orange-600 tracking-tight">
                SimFrii.com
              </div>
              <p className="text-gray-600 max-w-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus, odio iure quasi, ab, consequatur velita reiciendis
                itaque quaerat{" "}
              </p>
              <div className="flex space-x-4">
                <Link to="/">
                  <img src={facebook} alt="SimFrii Logo" />
                </Link>
                <Link to="/">
                  <img src={twitter} alt="SimFrii Logo" />
                </Link>
                <Link to="/">
                  <img src={insta} alt="SimFrii Logo" />
                </Link>
                <Link to="/">
                  <img src={youtube} alt="SimFrii Logo" />
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
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  United States
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  London
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Canada
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Australia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
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
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <img src={location} alt="" />
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  44 Danwers, NY City, USA, 70-102
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <img src={email} alt="" />
                <a
                  href="https://hr-akash23.web.app"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  simfrii.contact@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <img src={call} alt="" />
                <a
                  href="https://hr-akash23.web.app"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  91+585-656-658
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6">
          <div className="text-gray-500 text-sm text-center">
            © 2025 <span className="text-[#aa6320]">Akash</span>. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
