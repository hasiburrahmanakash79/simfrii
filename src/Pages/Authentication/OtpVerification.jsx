import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../lib/api-client";
import { ArrowLeft } from "lucide-react";

const OtpVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state?.user_id || '';
  const email = location.state?.email || '';
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onSubmit = async (data) => {
    const otp = `${data.otp0}${data.otp1}${data.otp2}${data.otp3}`;
    setApiError(null);
    try {
      const response = await apiClient.post("/auth/verify-reset-code", {
        user_id: user_id,
        verification_code: otp,
      });
      // On success, navigate to reset password page
      navigate("/reset-password", { state: { user_id, secret_key: response.data.secret_key } });
    } catch (error) {
      console.error("OTP Verification Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";
      setApiError(errorMessage);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    if (resendEnabled) {
      setTimer(60);
      setResendEnabled(false);
      setApiError(null);
      try {
        await apiClient.post("/auth/forgot-password", {
          email_address: email,
        });
      } catch (error) {
        console.error("Resend OTP Error:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Failed to resend OTP. Please try again.";
        setApiError(errorMessage);
      }
    }
  };

  const handleInputChange = (formOnChange) => (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return; // Allow only digits
    formOnChange(e);
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="min-h-screen place-content-center bg-[#F8D3AD]  p-5">
      {/* Right Side */}
      <div className="flex items-center justify-center p-8">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-md p-10">
          <h2 className="text-2xl font-bold text-center mb-2">
            Verify Your E-mail
          </h2>
          <p className="text-center text-sm mb-6">
            We have sent a 4-digit verification code to your email.
          </p>

          {/* Display API error if any */}
          {apiError && (
            <p className="text-red-500 text-sm text-center mb-4">{apiError}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex space-x-4 justify-center">
              {[0, 1, 2, 3].map((index) => {
                const { onChange: formOnChange, ref: formRef, ...rest } = register(`otp${index}`, { required: true, maxLength: 1 });
                return (
                  <input
                    key={index}
                    {...rest}
                    ref={(el) => {
                      formRef(el);
                      inputRefs[index].current = el;
                    }}
                    type="text"
                    maxLength="1"
                    onChange={(e) => handleInputChange(formOnChange)(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-16 h-12 text-center border border-base-300 bg-base-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 text-lg"
                  />
                );
              })}
            </div>
            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm text-center">
                Please fill all OTP fields
              </p>
            )}

            {/* Resend OTP with Timer */}
            <p className="text-center text-sm">
              {resendEnabled ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[#fda852] hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-500">Resend OTP in {timer}s</span>
              )}
            </p>

            <button
              type="submit"
              className="btn-primary"
            >
              Verify OTP
            </button>
          </form>
          {/* Back Button */}
          <div className="flex justify-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[#fda852] cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;