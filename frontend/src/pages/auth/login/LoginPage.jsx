import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail, MdPassword, MdDarkMode, MdLightMode } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const [darkMode, setDarkMode] = useState(false);
	const queryClient = useQueryClient();

	const toggleTheme = () => {
		setDarkMode((prev) => !prev);
		document.documentElement.classList.toggle("dark");
	};

	const { mutate: loginMutation, isPending, isError, error } = useMutation({
		mutationFn: async ({ username, password }) => {
		  const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		  });
	  
		  const data = await res.json();
		  if (!res.ok) {
			throw new Error(data?.message || "Invalid credentials");
		  }
		  return data;
		},
		onSuccess: (data) => {
		  queryClient.invalidateQueries({ queryKey: ["authUser"] });
		  console.log("Login successful:", data); // Debugging
		},
		onError: (err) => {
		  console.error("Login failed:", err.message); // Debugging
		},
	  });
	  

	  const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitting form data:", formData); // Debugging
		loginMutation(formData);
	  };
	  

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? "bg-green-900 text-white" : "bg-green-100 text-gray-900"} w-full relative`}>
    
    {/* Sun/Moon Button - No Border */}
    <button onClick={toggleTheme} className="absolute top-4 right-4 text-2xl text-gray-800 dark:text-yellow-400">
        {darkMode ? <MdLightMode /> : <MdDarkMode />}
    </button>

    {/* White Background Box (Light Green in Dark Mode) */}
    <form 
    onSubmit={handleSubmit} // ✅ Fix
    className="flex flex-col gap-4 p-8 bg-white dark:bg-green-500 rounded-lg shadow-lg w-full max-w-md"
>
    <h1 className="text-3xl font-extrabold text-center text-teal-700 dark:text-teal-900">DoctorSphere Login</h1>

    <label className="input input-bordered flex items-center gap-2 p-2 rounded bg-white dark:bg-green-300">
        <MdOutlineMail className="text-gray-700 dark:text-gray-900" />
        <input type="text" className="grow bg-transparent focus:outline-none text-gray-900 dark:text-gray-900" placeholder="Username" name="username" onChange={handleInputChange} value={formData.username} />
    </label>

    <label className="input input-bordered flex items-center gap-2 p-2 rounded bg-white dark:bg-green-300">
        <MdPassword className="text-gray-700 dark:text-gray-900" />
        <input type="password" className="grow bg-transparent focus:outline-none text-gray-900 dark:text-gray-900" placeholder="Password" name="password" onChange={handleInputChange} value={formData.password} />
    </label>

    <button type="submit" className="btn rounded-full bg-teal-600 text-white hover:bg-teal-700">
        {isPending ? "Loading..." : "Login"}
    </button>

    {isError && <p className="text-red-500">{error.message}</p>}
</form>


    <div className="flex flex-col gap-2 mt-4">
        <p className="text-lg">Don't have an account?</p>
        <Link to="/signup">
            <button className="btn rounded-full bg-teal-500 text-white hover:bg-teal-600 w-full">Sign up</button>
        </Link>
    </div>
</div>

	);
};
export default LoginPage;
