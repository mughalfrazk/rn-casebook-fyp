import { useState } from "react";
import { supabase } from "../../constants/supabase";

export const useSupabaseClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const runQuery = (query) => {
		setIsLoading(true);
		return query.then((res) => {
			if (res?.error) {
				setError(res?.error?.message);
				console.log(res?.error);
				setIsLoading(false);
				throw error;
			}
			setIsLoading(false);
			if (res?.data?.length === 0) {
				setError("No data found");
			}
			return res?.data ? res?.data : res?.user;
		});
	};

	return { isLoading, runQuery, error, setError };
};
