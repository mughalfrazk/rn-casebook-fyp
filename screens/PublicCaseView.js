import React, { Fragment, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, FlatList } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input } from "react-native-elements";

import { styles } from "../shared/styles/styles";
import { supabase } from "../constants/supabase";
import { textStyles } from "../shared/styles/text";
import ListViewBg from "../shared/components/ListViewBg";
import { AuthContext } from "../shared/context/auth-context";
import { useSupabaseClient } from "../shared/hooks/supabase-hook";
import { isObjEmpty } from "../shared/utils/functions";

const PublicCaseView = ({ navigation, route }) => {
	const auth = useContext(AuthContext);
	const { isLoading, runQuery, error, setError } = useSupabaseClient();
	const caseId = route?.params?.case_id;
	const accessType = route?.params?.access_type;
	let adjournDateInput = {
		date: new Date(),
		reason: "",
		case_id: caseId,
	};

	const [adjournInput, setAdjournInput] = useState(adjournDateInput);
	const [adjournError, setAdjournError] = useState("");
	const [adjournModal, setAdjournModal] = useState(false);
	const [caseData, setCaseData] = useState({});
	const [adjournDates, setAdjournDates] = useState([]);

	const onChange = (event, selectedDate) => {
		setAdjournInput({ ...adjournInput, date: selectedDate });
	};

	const getCaseDataApi = async () => {
		try {
			const res = await runQuery(
				supabase
					.from("Cases")
					.select("*, court_id(name, address)")
					.eq("id", caseId),
			);
			setCaseData(res[0]);
		} catch (err) {
			console.log(err);
		}
	};

	const submitAdjournDateApi = async () => {
		setAdjournError("");
		let newDate = adjournInput.date.getTime();
		let oldDate = new Date(caseData?.hearing_date).getTime();
		console.log(adjournInput.date);
		console.log(newDate);
		console.log(oldDate);
		console.log(newDate > oldDate);
		if (!isObjEmpty(adjournInput)) {
			setAdjournError("Please fill all fields.");
			return;
		}

		if (newDate < oldDate) {
			setAdjournError("Date should be a future date.");
			return;
		}

		try {
			const res = await runQuery(
				supabase.from("AdjournDates").insert(adjournInput),
			);
			console.log(res);
			setAdjournInput(adjournDateInput);
			setAdjournModal(false);
			getAdjournDatesApi();
		} catch (err) {}
	};

	const getAdjournDatesApi = async () => {
		try {
			const res = await supabase
				.from("AdjournDates")
				.select("*")
				.eq("case_id", caseId)
				.order("date", { ascending: false });
			console.log(res.data);
			setAdjournDates(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCaseDataApi();
		getAdjournDatesApi();
	}, [caseId]);

	return (
		<ListViewBg
			title="Case Detail"
			loading={isLoading}
			back={() => navigation.goBack()}
		>
			{!!error && (
				<Text style={[textStyles.red, textStyles.h5, styles.mb1]}>
					{error}
				</Text>
			)}
			<View style={innerStyles.titleSection}>
				<Text
					style={[textStyles.h2, textStyles.bold, textStyles.center]}
				>
					{caseData?.title}
				</Text>
				<Text style={[textStyles.h4, textStyles.center]}>
					{caseData?.hearing_date?.split("T")[0]}
				</Text>
				<Text style={[textStyles.h5, textStyles.center]}>
					{caseData?.case_type}
				</Text>
			</View>
			<View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>On Behalf:</Text>
				<Text style={textStyles.h3}>{caseData?.on_behalf}</Text>
			</View>
			<View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Case no:</Text>
				<Text style={textStyles.h3}>{caseData?.case_no}</Text>
			</View>
			<View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Filed U:</Text>
				<Text style={textStyles.h3}>{caseData?.filed_u}</Text>
			</View>
			<View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>
					Client name:
				</Text>
				<Text style={textStyles.h3}>{caseData?.party_name}</Text>
			</View>
			<View style={innerStyles.adjournDatesSection}>
				<FlatList
					data={adjournDates}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={innerStyles.adjournDateCard}>
							<Text>{item?.reason}</Text>
							<Text>{item?.date?.split("T")[0]}</Text>
						</View>
					)}
				/>
			</View>
			{/* {accessType === 1 && (
				<View style={innerStyles.buttons}>
					<Button
						title="Add Client"
						style={innerStyles.btn}
						onPress={() =>
							navigation.navigate("AddClient", { caseId })
						}
					/>
					<Button
						title="Add Lawyer"
						style={innerStyles.btn}
						onPress={() =>
							navigation.navigate("AddLawyer", { caseId })
						}
					/>
					<Button
						title="Send Token"
						style={innerStyles.btn}
						onPress={() =>
							navigation.navigate("GenerateToken", { caseId })
						}
					/>
				</View>
			)} */}
			{/* <View style={innerStyles.buttons}>
				<Button
					title="Add Adjourn Date"
					style={innerStyles.btn}
					onPress={() => setAdjournModal((prevMode) => !prevMode)}
				/>
			</View> */}

			<Modal
				animationType="slide"
				transparent={true}
				visible={adjournModal}
			>
				<View style={innerStyles.centeredView}>
					<View style={innerStyles.modalView}>
						<Text style={innerStyles.modalText}>
							Add Adjourn Date
						</Text>
						<View style={innerStyles.datePicker}>
							<DateTimePicker
								testID="dateTimePicker"
								value={adjournInput.date}
								mode={"date"}
								is24Hour={true}
								display="default"
								onChange={onChange}
							/>
						</View>
						<Input
							placeholder="Reason"
							style={innerStyles.modalInput}
							value={adjournInput.reason}
							onChangeText={(text) =>
								setAdjournInput({
									...adjournInput,
									reason: text,
								})
							}
						/>
						{!!adjournError && (
							<Text
								style={[
									textStyles.red,
									textStyles.h5,
									styles.mb1,
								]}
							>
								{adjournError}
							</Text>
						)}
						<View style={innerStyles.modalBtns}>
							<Button
								title="Close"
								style={innerStyles.modalBtn}
								onPress={() => {
									setAdjournError("");
									setAdjournInput(adjournDateInput);
									setAdjournModal((prevMode) => !prevMode);
								}}
							/>
							<Button
								title="Submit"
								loading={isLoading}
								style={innerStyles.modalBtn}
								onPress={submitAdjournDateApi}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</ListViewBg>
	);
};

const innerStyles = StyleSheet.create({
	modalView: {
		margin: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		alignContent: "stretch",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 5,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 10,
	},

	content: {
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	titleSection: {
		paddingVertical: 20,
		backgroundColor: "#9fd3ef",
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
		marginHorizontal: 20,
	},
	modalBtns: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginHorizontal: 20,
	},
	modalBtn: {
		paddingHorizontal: 5,
	},
	modalInput: {
		minWidth: 180,
		borderBottomWidth: 2,
		borderColor: "grey",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	datePicker: {
		width: 100,
		marginTop: 10,
		marginBottom: 10,
	},
	adjournDatesSection: {
		marginTop: 10,
	},
	adjournDateCard: {
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#d8d8d8",
		borderColor: "#ffffff",
		borderBottomWidth: 1,
	},
});

export default PublicCaseView;
