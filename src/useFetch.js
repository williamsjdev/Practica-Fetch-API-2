import { useState, useEffect } from "react";


export function useFetch(url) {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [constroller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        fetch(url, {signal: abortController.signal})
        .then(response => response.json())
        .then((data) => setData(data))
        .catch((error) => {
            if(error.name === "AbortError") {
                console.log("Request cancelled")
            } else {
                setError(error)
            }
        })
        .finally(() => setLoading(false));

        return () => abortController.abort();
    }, []);

    const handleCancelRequest = () => {
        if(constroller) {
            constroller.abort();
            setError("Request cancelled")
        }
    }

    return { data, loading, error, handleCancelRequest };
}