

const Footer = () => {
  
  return (
    <footer className="bg-white md:py-16 py-7 container mx-auto">
      <div className="px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
          <div className="space-y-3">
            <div className="text-2xl font-bold text-orange-600 tracking-tight">
              SimFrii.com
            </div>
            <p className="text-gray-600 max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              odio iure quasi, ab, consequatur velita reiciendis itaque quaerat{" "}
            </p>
          </div>
        </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Providers</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Join Now
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Payments
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#8272ED] transition-colors"
                >
                  You Tube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-7">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                alt="Stripe"
                className="h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
                alt="PayPal"
                className="h-6"
              />
              <div className="text-gray-600 font-semibold text-sm">Klarna</div>
            </div>

            <div className="text-gray-500 text-sm">
              © 2025 <span className="text-[#8272ED]">Evola</span>. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
