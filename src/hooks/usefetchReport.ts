import { useState } from "react";
import { sendRequestsInParallel } from "../util.ts";

const apiKey = "AIzaSyBnIC-VAgGFhBtrRPNN-1DiCkCFmb4QCZk"; // Securely access your API key

const endpoint = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${apiKey}`;

export const useFetchReport = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<any>(null);

  const fetchCrUXData = async (urls: string[], formFactor: any) => {
    setLoading(true);
    try {
      if (urls) {
        const response = await sendRequestsInParallel(endpoint, {
          urls: urls, // Or use `url` if querying specific pages
          filters: {
            formFactor: formFactor,
          },
        });
        setData(response.data);
      }
    } catch (error: any) {
      // console.error("Error fetching CrUX data:", error);
      setError(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return [loading, data, error, fetchCrUXData];
};
