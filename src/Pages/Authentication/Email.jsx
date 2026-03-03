import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client";
import { ArrowLeft } from "lucide-react";

const Email = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/forgot-password", {
        email_address: data.email,
      });
      console.log(response.data.user_id);

      // Assuming successful response
      setSuccessMessage("A password reset link has been sent to your email.");
      navigate("/otp", {
        state: { user_id: response.data.user_id, email: data.email },
      });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset link. Please try again.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8D3AD] flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl ">
        <div className="md:min-w-lg w-full p-10">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Reset password
          </h2>
          <p className="text-center text-sm mb-6 text-[#747086]">
            To reset password enter your email
          </p>

          {/* Display success message if any */}
          {successMessage && (
            <p className="text-green-500 text-sm text-center mb-4">
              {successMessage}
            </p>
          )}

          {/* Display API error if any */}
          {apiError && (
            <p className="text-red-500 text-sm text-center mb-4">{apiError}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="">
              <label className="block text-sm font-medium mb-1">Email</label>
              <div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="Enter your email"
                  className="w-full border border-base-300 bg-base-200 rounded-full p-2 outline-none"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
           <div className="flex justify-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[#fda852] cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Back to Sign-in page</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
