const LoadingSpinner = ({ size = "md", theme = "light" }) => {
	const sizeClass = `loading-${size}`;
	const colorClass = theme === "dark" ? "text-light-green" : "text-teal";
  
	return <span className={`loading loading-spinner ${sizeClass} ${colorClass}`} />;
  };
  
  export default LoadingSpinner;
  