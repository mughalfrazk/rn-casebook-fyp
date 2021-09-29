import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { supabase } from "../constants/supabase";
import { AuthContext } from "../shared/context/auth-context";
import DashboardBg from "../shared/components/DashboardBg";
import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";
import { useSupabaseClient } from "../shared/hooks/supabase-hook";

const DashboardScreen = ({ navigation }) => {
	const auth = useContext(AuthContext);
	const { isLoading, runQuery, error, setError } = useSupabaseClient();

	const getData = async () => {
		// const response = await runQuery(supabase.from("Users").select("*"));
		// console.log(response)
		console.log(auth);
	};

	return auth.role === "lawyer" ? (
		<DashboardBg
			title={
				<View style={innerStyles.dashboardTopBar}>
					<View>
						<Text
							style={[
								textStyles.h3,
								textStyles.white,
								textStyles.bold,
							]}
						>
							Welcome,
						</Text>
						<Text style={[styles.whiteHeading]}>{auth.name}</Text>
					</View>
					<TouchableOpacity
						style={styles.profileBtn}
						onPress={() => navigation.navigate("Profile")}
					>
						<Icon
							name="account-circle"
							size={50}
							color="#fff"
							style={innerStyles.cardIcon}
						/>
					</TouchableOpacity>
				</View>
			}
		>
			<View style={innerStyles.dashobardRow}>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("AddNew")}
				>
					<Icon
						name="note-add"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>Add New Case</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("UpcomingDates")}
				>
					<Icon
						name="notifications-on"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>Upcoming Dates</Text>
				</TouchableOpacity>
			</View>
			{/* <View style={innerStyles.dashobardRow}>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("ClientList")}
				>
					<Icon
						name="groups"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>Client's List</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("CourtList")}
				>
					<Icon
						name="account-balance"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>Court's List</Text>
				</TouchableOpacity>
			</View> */}
			<View style={innerStyles.dashobardRow}>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("AllCases")}
				>
					<Icon
						name="list"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>All Cases</Text>
				</TouchableOpacity>
			</View>
		</DashboardBg>
	) : (
		<DashboardBg
			title={
				<View style={innerStyles.dashboardTopBar}>
					<View>
						<Text
							style={[
								textStyles.h3,
								textStyles.white,
								textStyles.bold,
							]}
						>
							Welcome,
						</Text>
						<Text style={[styles.whiteHeading]}>{auth.name}</Text>
					</View>
					<TouchableOpacity
						style={styles.profileBtn}
						onPress={() => navigation.navigate("Profile")}
					>
						<Icon
							name="account-circle"
							size={50}
							color="#fff"
							style={innerStyles.cardIcon}
						/>
					</TouchableOpacity>
				</View>
			}
		>
			{/* <View style={innerStyles.dashobardRow}>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("UpcomingDates")}
				>
					<Icon
						name="notifications-on"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>Upcoming Dates</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("CourtList")}
				>
					<Icon
						name="account-balance"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>Court's List</Text>
				</TouchableOpacity>
			</View> */}
			<View style={innerStyles.dashobardRow}>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("ClientAllCases")}
				>
					<Icon
						name="list"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>All Cases</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={getData}
				>
					<Icon
						name="calendar-today"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>Api</Text>
				</TouchableOpacity> */}
			</View>
			{/* <View style={innerStyles.dashobardRow}>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={() => navigation.navigate("AllCases")}
				>
					<Icon
						name="list"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>All Cases</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={innerStyles.dashobardCard}
					onPress={getData}
				>
					<Icon
						name="calendar-today"
						size={50}
						color="#159ded"
						style={innerStyles.cardIcon}
					/>
					<Text style={innerStyles.cardText}>Api</Text>
				</TouchableOpacity>
			</View> */}
		</DashboardBg>
	);
};

const innerStyles = StyleSheet.create({
	dashboardTopBar: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dashobardRow: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	dashobardCard: {
		backgroundColor: "white",
		margin: 10,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: 120,
		shadowColor: "#000000",
		shadowOpacity: 0.3,
		shadowRadius: 10,
		borderRadius: 8,
	},
	cardText: {
		textAlign: "center",
		fontSize: 12,
		letterSpacing: 1,
	},
	cardIcon: {
		marginBottom: 7,
	},
});
export default DashboardScreen;
