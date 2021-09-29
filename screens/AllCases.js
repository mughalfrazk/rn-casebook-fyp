import React, { useContext, useEffect, useState } from "react";
import {
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Text,
	Dimensions,
} from "react-native";

import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";
import StaticViewBg from "../shared/components/StaticViewBg";
import CaseItemList from "../shared/components/CaseListItem";
import NoData from "../shared/components/NoData";
import { supabase } from "../constants/supabase";
import { useSupabaseClient } from "../shared/hooks/supabase-hook";
import { AuthContext } from "../shared/context/auth-context";

const AllCases = ({ navigation }) => {
	const auth = useContext(AuthContext);
	const { isLoading, runQuery, error, setError } = useSupabaseClient();
	const [casesList, setCasesList] = useState([]);

	const getMyCasesApi = async () => {
		try {
			const res = await runQuery(
				supabase
					.from("CasesVLawyers")
					.select("case_id(id, title, hearing_date), access_type, id")
					.eq("lawyer_id", auth.uid)
					// .eq("case_id(is_disposed)", false)
					.order("updated_at", { ascending: false }),
			);
			setError("");
			setCasesList(res);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getMyCasesApi();
	}, []);

	return (
		<StaticViewBg
			title="All Cases"
			loading={isLoading}
			back={() => navigation.goBack()}
		>
			{!!error && (
				<Text style={[textStyles.red, textStyles.h5, styles.mb1]}>
					{error}
				</Text>
			)}
			{casesList.length !== 0 ? (
				<FlatList
					style={{
						width: Dimensions.get("window").width,
						height: 100,
					}}
					data={casesList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={innerStyles.singlePill}
							onPress={() =>
								navigation.navigate("CaseView", {
									case_id: item?.case_id?.id,
									access_type: item?.access_type
								})
							}
						>
							<CaseItemList
								title={item?.case_id?.title}
								date={
									item?.case_id?.hearing_date?.split("T")[0]
								}
							/>
						</TouchableOpacity>
					)}
				/>
			) : <NoData />}
		</StaticViewBg>
	);
};

const innerStyles = StyleSheet.create({
	listArea: {
		borderColor: "red",
		borderWidth: 5,
		flex: 1,
		width: Dimensions.get("window").width,
	},
	singlePill: {
		alignSelf: "stretch",
		paddingHorizontal: 10,
	},
});

export default AllCases;
