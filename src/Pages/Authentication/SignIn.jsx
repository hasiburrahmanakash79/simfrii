import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { parseJwt, setAuthTokens } from "../../lib/cookie-utils";
import apiClient from "../../lib/api-client";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        email_address: data.email,
        password: data.password,
      };
      const response = await apiClient.post("/auth/sign-in", payload);
      console.log(response);
      const { access_token, refresh_token } = response.data; // Adjust based on actual response structure
      setAuthTokens(access_token, refresh_token);
      const parsedToken = parseJwt(access_token);
      const role = response.data.role;
      console.log(role);

      // Navigate based on role
      if (role === "user") {
        navigate("/");
      } else if (role === "staff" || role === "stuff") { // Assuming 'stuff' is a typo for 'staff'
        navigate("/dashboard/stuffOverview");
      } else if (role === "admin") {
        navigate("/dashboard/adminOverview");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("SignIn Error:", error);
      setError("root", {
        message: error.response?.data?.message || "Sign in failed. Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8D3AD] flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl ">
        <div className="md:min-w-lg w-full p-10">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Welcome Back!
          </h2>
          <p className="text-center text-sm mb-6 text-[#747086]">
            Enter your email and password to access your account.
          </p>
          {errors.root && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errors.root.message}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  className="w-full border border-base-300 bg-base-200 rounded-full p-2 outline-none"
                />
                <MdEmail className="absolute inset-y-3 right-3 flex items-center text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    
                  })}
                  placeholder="********"
                  className="w-full border border-base-300 bg-base-200 rounded-full p-2 outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-xs">
                <input type="checkbox" />
                <p>Remember me</p>
              </div>
              <div>
                <Link to="/email" className="text-xs text-[#fda852]">
                  Forget Password
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="divider">Or Continue with</div>
            {/* Social Login */}
            <div className="flex space-x-4">
              <button type="button" className="flex-1 flex items-center justify-center border border-base-300 rounded-full py-2 hover:bg-gray-100">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
              <button type="button" className="flex-1 flex items-center justify-center border border-base-300 rounded-full py-2 hover:bg-gray-100">
              <img
                src="https://assets.likefamily.com.au/public/images/socials/apple-icon.png?auto=compress&q=50&ixlib=react-9.3.0"
                alt="Apple"
                className="w-7 h-7 mr-2"
              />
              Apple
            </button>
            </div>

            <button type="submit" className="btn-primary w-full mt-4" disabled={isLoading}>
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>
          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#fda852] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;