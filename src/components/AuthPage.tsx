import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Stethoscope, User, Mail, Lock } from "lucide-react";

interface AuthForm {
  name?: string;
  email: string;
  password: string;
  specialty?: string;
}

  const AuthPage = ({ isSignup }: { isSignup: boolean }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: AuthForm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        isSignup ? "http://localhost:6001/api/auth/register"
    : "http://localhost:6001/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user)); // Store user data
      navigate("/profile"); // Redirect to profile page
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-teal-50 to-green-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-teal-300">
        <h2 className="text-3xl font-bold text-teal-700 text-center mb-6">
          {isSignup ? "Join DocSphere" : "Welcome Back"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-teal-500 w-5 h-5" />
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-teal-500 w-5 h-5" />
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-teal-500 w-5 h-5" />
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          {isSignup && (
            <div className="relative">
              <Stethoscope className="absolute left-3 top-3 text-teal-500 w-5 h-5" />
              <input
                {...register("specialty")}
                type="text"
                placeholder="Specialty (Optional)"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-all"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span className="text-teal-600 font-medium cursor-pointer hover:underline">
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export const Login = () => <AuthPage isSignup={false} />;
export const Signup = () => <AuthPage isSignup={true} />;
export default AuthPage;
