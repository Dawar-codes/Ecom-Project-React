import { useMutation } from "@tanstack/react-query";
import { useActionState } from "react";
import { createUser } from "../util/https";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      localStorage.setItem("userRole", data.user.role); // stores role
      navigate("/");
    },
  });

  function signupAction(prevState, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    let errors = [];

    if (!name.trim()) {
      errors.push("Please provide your name.");
    }
    if (!email.trim().includes("@")) {
      errors.push("Please enter a valid email address");
    }
    if (password.trim().length < 8) {
      errors.push("Password must be eight characters long");
    }
    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          name,
          email,
        },
      };
    }


    mutate({ name, email, password });

    return { errors: null };
  }

  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form action={formAction} className="space-y-4">
          {/* Name Input */}

          <div>
            <label htmlFor="name" className="block text-sm text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={formState.enteredValues?.name}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password Input */}

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          {/* list the errors if any */}
          {formState.errors && (
            <ul className="text-red-600">
              {formState.errors.map((error) => (
                <li key={error}>*{error}</li>
              ))}
            </ul>
          )}

          {isError && (
            <div>
              <h1 className="text-red-400">Error in mutation</h1>
            </div>
          )}
          {/* Submit Button */}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isPending ? "Submitting" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
