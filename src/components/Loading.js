import React, { useState, useEffect } from "react";
import Image from "next/image";

const Loading = () => {
	const [selectedGif, setSelectedGif] = useState("");

	useEffect(() => {
		// Randomly select a GIF when the component mounts
		const gifs = ["/zeldaloading.gif", "/zeldaloading2.gif"];
		const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
		setSelectedGif(randomGif);
	}, []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Image src={selectedGif} width="300" height="300" alt="Loading..." />
			<h1 className="text-md font-press-start pt-5">Loading...</h1>
		</div>
	);
};

export default Loading;
