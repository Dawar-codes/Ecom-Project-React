import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useActionState } from "react";
import { loginUser } from "../util/https";

export default function LoginPage() {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("userRole", data.role) // stores role
      navigate('/');
    },
    onError: (err) => {
      console.error("Login error:", err);
    }
  });


  function loginAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    let errors = [];

    if (!email.trim()) {
      errors.push("Please enter your email.");
    }
    if (!password.trim()) {
      errors.push("Please enter your password.");
    }

    // If there are errors, return them, otherwise proceed with login
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: { email },
      };
    }

    mutate({ email, password });

    return { errors: null };
  }

  const [formState, formAction] = useActionState(loginAction, {
    errors: null,
  });

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form action={formAction} className="space-y-4">
          {/* Email Input */}

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              defaultValue={formState.enteredValues?.email}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Handling */}
          {formState.errors && (
            <ul className="text-red-600">
              {formState.errors.map((error) => (
                <li key={error}>* {error}</li>
              ))}
            </ul>
          )}
          {isError && <h1 className="text-red-500">Error in Mutation</h1>}


          {/* Submit Button */}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isPending? "Logging in" : "Login"}
            </button>
          </div>
        </form>

        {/* Additional Links */}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
