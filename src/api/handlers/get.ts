
const get = async (endpoint: string) => {
	try {
		const response = await fetch(endpoint);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
export default get