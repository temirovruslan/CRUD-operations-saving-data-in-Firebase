export const fetchData = async () => {
	try {
		const url = "http://localhost:3000/sectors";
		const response = await fetch(url);
		if (response.ok) {
			return response.json();
		} else {
			console.log("Faild to fetch");
			throw new Error("Faild");
		}
	} catch (error: any) {
		console.log(error.message);
	}
};
