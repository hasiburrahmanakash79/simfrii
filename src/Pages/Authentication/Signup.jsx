import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md"; // Added for email icon
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        email_address: data.email,
        full_name: data.full_name,
        password: data.password,
        confirm_password: data.confirm_password,
        terms_agreed: data.terms_agreed,
      };
      console.log("Signup Payload:", payload); // Added for debugging
      const response = await apiClient.post("/auth/sign-up", payload);
      console.log("Signup Response:", response); // Added for debugging
      const userId = response.data.user_id; 
      console.log(userId);
      navigate("/otp", { state: { userId, email: data.email } });
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
      setError("root", {
        message: error.response?.data?.message || "Signup failed. Please try again.",
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
            Sign Up
          </h2>
          <p className="text-center text-sm mb-6 text-[#747086]">
            Enter your email and password to access your account.
          </p>
          {errors.root && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errors.root.message}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name/Business Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("full_name", {
                    required: "Full name is required",
                  })}
                  placeholder="Enter your Name"
                  className="w-full border border-base-300 bg-base-200 rounded-full p-2 outline-none"
                />
                <FaUser className="absolute inset-y-3 right-3 flex items-center text-gray-500" />
              </div>
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
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
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
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
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("confirm_password", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
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
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("terms_agreed", {
                  required: "You must agree to the terms",
                })}
                className="checkbox checkbox-primary mr-2"
              />
              <label className="text-sm">
                I agree to the{" "}
                <a href="/terms" className="text-[#fda852] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#fda852] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms_agreed && (
              <p className="text-red-500 text-sm mt-1">
                {errors.terms_agreed.message}
              </p>
            )}

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

            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#fda852] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;