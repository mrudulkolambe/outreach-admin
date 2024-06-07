
const post = async (endpoint: string, body: any) => {
	try {
	  const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${localStorage.getItem("token")}`
		},
		body: JSON.stringify(body)
	  });
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error("Error posting data:", error);
	  return null;
	}
  };
  
  export default post