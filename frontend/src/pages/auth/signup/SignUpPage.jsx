import { Link } from "react-router-dom";
import { useState } from "react";
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline, MdDarkMode, MdLightMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
	const [formData, setFormData] = useState({ email: "", username: "", fullName: "", password: "" });
	const [darkMode, setDarkMode] = useState(false);
	const queryClient = useQueryClient();

	const toggleTheme = () => {
		setDarkMode((prev) => !prev);
		document.documentElement.classList.toggle("dark");
	};

	const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ email, username, fullName, password }) => {
			try {
				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, username, fullName, password }),
				});

				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Failed to create account");
				return data;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutate(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-green-900 text-white" : "bg-green-100 text-gray-900"} w-full relative`}>
	{/* Sun/Moon Toggle Button */}
	<button onClick={toggleTheme} className="absolute top-4 right-4 text-2xl text-gray-800 dark:text-yellow-400">
		{darkMode ? <MdLightMode /> : <MdDarkMode />}
	</button>

	<div className="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white dark:bg-green-500 rounded-lg shadow-lg">
		<h1 className="text-3xl font-bold text-teal-700 dark:text-teal-900 mb-4">Join Today</h1>

		<form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
			<label className="input input-bordered rounded flex items-center gap-2 bg-white dark:bg-green-300 px-3 py-2">
				<MdOutlineMail className="text-gray-700 dark:text-gray-900" />
				<input type="email" className="grow bg-transparent focus:outline-none text-gray-900 dark:text-gray-900" placeholder="Email" name="email" onChange={handleInputChange} value={formData.email} />
			</label>

			<div className="flex gap-4 flex-wrap">
				<label className="input input-bordered rounded flex items-center gap-2 flex-1 bg-white dark:bg-green-300 px-3 py-2">
					<FaUser className="text-gray-700 dark:text-gray-900" />
					<input type="text" className="grow bg-transparent focus:outline-none text-gray-900 dark:text-gray-900" placeholder="Username" name="username" onChange={handleInputChange} value={formData.username} />
				</label>
				<label className="input input-bordered rounded flex items-center gap-2 flex-1 bg-white dark:bg-green-300 px-3 py-2">
					<MdDriveFileRenameOutline className="text-gray-700 dark:text-gray-900" />
					<input type="text" className="grow bg-transparent focus:outline-none text-gray-900 dark:text-gray-900" placeholder="Full Name" name="fullName" onChange={handleInputChange} value={formData.fullName} />
				</label>
			</div>

			<label className="input input-bordered rounded flex items-center gap-2 bg-white dark:bg-green-300 px-3 py-2">
				<MdPassword className="text-gray-700 dark:text-gray-900" />
				<input type="password" className="grow bg-transparent focus:outline-none text-gray-900 dark:text-gray-900" placeholder="Password" name="password" onChange={handleInputChange} value={formData.password} />
			</label>

			<button className="btn w-full rounded-full bg-teal-600 text-white hover:bg-teal-700 py-3 text-lg">
				{isPending ? "Loading..." : "Sign up"}
			</button>

			{isError && <p className="text-red-500">{error.message}</p>}
		</form>

		<div className="mt-4">
			<p className="text-lg">Already have an account?</p>
			<Link to="/login">
				<button className="btn w-full rounded-full bg-teal-500 text-white hover:bg-teal-600 py-3 text-lg">Login</button>
			</Link>
		</div>
	</div>
</div>

	);
};
export default SignUpPage;
