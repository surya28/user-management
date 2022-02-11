import { useEffect, useState } from "react";

const useApi = (url, method) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const refetch = () => {
    setData(null);
  };

  const fetchApi = () => {
    fetch(url, {
      method: method,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setData(json);
      })
      .catch((err) => {
        setError(true);
      });
  };

  useEffect(() => {
    fetchApi();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data === null) fetchApi();
    //eslint-disable-next-line
  }, [data]);

  return { loading, data, error, refetch };
};

export default useApi;
