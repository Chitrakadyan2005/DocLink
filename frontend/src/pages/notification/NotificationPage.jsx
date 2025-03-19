import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser, FaHeart } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const NotificationPage = () => {
	const queryClient = useQueryClient();
	const [darkMode, setDarkMode] = useState(false);

	const toggleTheme = () => {
		setDarkMode((prev) => !prev);
		document.documentElement.classList.toggle("dark");
	};

	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			const res = await fetch("/api/notifications");
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
	});

	const { mutate: deleteNotifications } = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/notifications", { method: "DELETE" });
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		onSuccess: () => {
			toast.success("Notifications deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<div className={`min-h-screen flex flex-col items-center ${darkMode ? "bg-green-900 text-white" : "bg-green-100 text-gray-900"} w-full relative`}>
			{/* Toggle Dark Mode Button */}
			<button onClick={toggleTheme} className="absolute top-4 right-4 text-2xl text-gray-800 dark:text-yellow-400">
				{darkMode ? <MdLightMode /> : <MdDarkMode />}
			</button>

			{/* Notifications Container */}
			<div className="w-full max-w-lg bg-white dark:bg-green-500 rounded-lg shadow-lg p-6 mt-12">
				{/* Header */}
				<div className="flex justify-between items-center border-b pb-2">
					<h1 className="text-2xl font-bold text-teal-700 dark:text-teal-900">Notifications</h1>
					<div className="relative">
						<button className="text-gray-600 dark:text-gray-200">
							<IoSettingsOutline className="w-6 h-6" />
						</button>
						<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-green-600 rounded shadow-md hidden group-hover:block">
							<button onClick={deleteNotifications} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-700">
								Delete all notifications
							</button>
						</div>
					</div>
				</div>

				{/* Loading State */}
				{isLoading && (
					<div className="flex justify-center h-32 items-center">
						<LoadingSpinner size="lg" />
					</div>
				)}

				{/* No Notifications */}
				{notifications?.length === 0 && <p className="text-center p-4 font-bold">No notifications 🤔</p>}

				{/* Notifications List */}
				{notifications?.map((notification) => (
					<div key={notification._id} className="border-b border-gray-300 dark:border-gray-600 py-3 flex items-center gap-4">
						{/* Notification Icon */}
						{notification.type === "follow" && <FaUser className="w-7 h-7 text-teal-500" />}
						{notification.type === "like" && <FaHeart className="w-7 h-7 text-red-500" />}

						{/* Notification Content */}
						<Link to={`/profile/${notification.from.username}`} className="flex gap-2 items-center">
							<img className="w-10 h-10 rounded-full border" src={notification.from.profileImg || "/avatar-placeholder.png"} alt="User" />
							<p className="text-gray-800 dark:text-white">
								<span className="font-bold">@{notification.from.username}</span>{" "}
								{notification.type === "follow" ? "followed you" : "liked your post"}
							</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotificationPage;
