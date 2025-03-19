import { useState } from "react";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = ({ darkMode }) => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<div
			className={`flex-[4_4_0] mr-auto border-r ${
				darkMode ? "border-teal-600 bg-teal-900 text-black" : "border-teal-300 bg-teal-100 text-black"
			} min-h-screen`}
		>
			{/* Header */}
			<div className={`flex w-full border-b ${darkMode ? "border-teal-600" : "border-teal-300"}`}>
				<div
					className={`flex justify-center flex-1 p-3 hover:bg-teal-400 transition duration-300 cursor-pointer relative ${
						feedType === "forYou" ? "text-teal-700 font-bold" : ""
					}`}
					onClick={() => setFeedType("forYou")}
				>
					For you
					{feedType === "forYou" && <div className="absolute bottom-0 w-10 h-1 rounded-full bg-teal-700"></div>}
				</div>
				<div
					className={`flex justify-center flex-1 p-3 hover:bg-teal-400 transition duration-300 cursor-pointer relative ${
						feedType === "following" ? "text-teal-700 font-bold" : ""
					}`}
					onClick={() => setFeedType("following")}
				>
					Following
					{feedType === "following" && (
						<div className="absolute bottom-0 w-10 h-1 rounded-full bg-teal-700"></div>
					)}
				</div>
			</div>

			{/* Create Post Input */}
			<CreatePost darkMode={darkMode} />

			{/* Posts Feed */}
			<Posts feedType={feedType} darkMode={darkMode} />
		</div>
	);
};

export default HomePage;
