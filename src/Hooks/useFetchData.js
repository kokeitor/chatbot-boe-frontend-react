import { useState, useEffect } from "react";

export function useFetchData(userMessage, inputFiles, url) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (response && response.data) {
      console.log(response.data.id); // 2
      console.log(response.data.email); // janet.weaver@reqres.in
      console.log(response.data.first_name); // Janet
      console.log(response.data.last_name); // Weaver
      console.log(response.data.avatar); // https://reqres.in/img/faces/2-image.jpg
    }
    if (error) {
      console.log(`API error : ${error}`);
    }
    console.log(`API loading : ${loading}`);
  }, [response, error, loading]);

  useEffect(() => {
    const request = fetch(url)
      .then((result) => result.json())
      .then((result) => setResponse(result))
      .catch((e) => setError(e.message)) // Use e.message to store error message as a string
      .finally(() => setLoading(false));
  }, []);

  return {
    response,
    error,
    loading,
  };
}
