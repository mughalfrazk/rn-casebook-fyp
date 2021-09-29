import React, { useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Input, Button, Text } from "react-native-elements";

import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";
import ListViewBg from "../shared/components/ListViewBg";
import { useSupabaseClient } from "../shared/hooks/supabase-hook";
import { supabase } from "../constants/supabase";
import { AuthContext } from "../shared/context/auth-context";
import { isObjEmpty } from "../shared/utils/functions";
import SuccessModal from "../shared/components/SuccessModal";

let casesInputValues = {
	title: "",
	hearing_date: new Date(),
	case_type: "",
	on_behalf: "",
	case_no: "",
	filed_u: "",
	party_name: "",
	contact_no: "",
};

let courtInputValues = {
	name: "",
	address: "",
};

const AddNewScreen = ({ navigation }) => {
	const auth = useContext(AuthContext);
	const { isLoading, runQuery, error, setError } = useSupabaseClient();

	const [casesInput, setCasesInput] = useState(casesInputValues);
	const [courtsInput, setCourtsInput] = useState(courtInputValues);
	const [caseSaved, setCaseSaved] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setCasesInput({ ...casesInput, hearing_date: currentDate });
	};

	const onSubmitHandler = async () => {
		console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
		const currentDate = new Date()
		setError("");
		if (!isObjEmpty(casesInput) || !isObjEmpty(courtsInput)) {
			console.log(casesInput);
			setError("Please complete all the inputs.");
			return;
		}
		if (casesInput?.hearing_date.getTime() < currentDate.getTime()) {
			console.log(casesInput.hearing_date);
			setError("Date must be a future date");
			return;
		}
		let casesData = casesInput;

		try {
			// Inserting into table Courts
			const courtRes = await runQuery(
				supabase.from("Courts").insert(courtsInput),
			);
			console.log("Hello");
			// Inserting into table Cases
			casesData.id = uuid.v4();
			casesData.court_id = courtRes[0]?.id;
			const caseRes = await runQuery(
				supabase.from("Cases").insert(casesInput),
			);

			// Inserting into table CasesVLawyers
			const lawyerRes = await runQuery(
				supabase.from("CasesVLawyers").insert({
					case_id: casesInput.id,
					lawyer_id: auth.uid,
					access_type: 1,
				}),
			);

			console.log("Case Saved");
			setCasesInput(casesInputValues);
			setCourtsInput(courtInputValues);
			setCaseSaved(true);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (caseSaved) setTimeout(() => setCaseSaved(false), 2000);
	}, [caseSaved]);

	return (
		<ListViewBg title="Add New Case" back={() => navigation.goBack()}>
			<View style={innerStyles.inputWrapper}>
				<View style={innerStyles.datePicker}>
					<DateTimePicker
						testID="dateTimePicker"
						value={casesInput.hearing_date}
						mode={"date"}
						is24Hour={true}
						display="default"
						onChange={onChange}
					/>
				</View>
				<Input
					placeholder="Case Title"
					value={casesInput.title}
					onChangeText={(text) =>
						setCasesInput({ ...casesInput, title: text })
					}
				/>
				<Input
					placeholder="Case Type"
					value={casesInput.case_type}
					onChangeText={(text) =>
						setCasesInput({ ...casesInput, case_type: text })
					}
				/>
				<Input
					placeholder="On Behalf of"
					value={casesInput.on_behalf}
					onChangeText={(text) =>
						setCasesInput({ ...casesInput, on_behalf: text })
					}
				/>
				<Input
					placeholder="Case No."
					value={casesInput.case_no}
					onChangeText={(text) =>
						setCasesInput({ ...casesInput, case_no: text })
					}
				/>
				<Input
					placeholder="Party Name"
					value={casesInput.party_name}
					onChangeText={(text) =>
						setCasesInput({ ...casesInput, party_name: text })
					}
				/>
				<Input
					placeholder="Contact No."
					value={casesInput.contact_no}
					onChangeText={(text) =>
						setCasesInput({
							...casesInput,
							contact_no: text.replace(/[^0-9]/g, ""),
						})
					}
				/>
				<Input
					placeholder="Filed U/Sec"
					value={casesInput.filed_u}
					onChangeText={(text) =>
						setCasesInput({ ...casesInput, filed_u: text })
					}
				/>
				<Input
					placeholder="Court Name"
					value={courtsInput.name}
					onChangeText={(text) =>
						setCourtsInput({ ...courtsInput, name: text })
					}
				/>
				<Input
					placeholder="Court Address"
					value={courtsInput.address}
					onChangeText={(text) =>
						setCourtsInput({ ...courtsInput, address: text })
					}
				/>
				<Text style={[textStyles.red, textStyles.h5, styles.mb1]}>
					{error}
				</Text>
				<Button
					title="Submit"
					loading={isLoading}
					onPress={onSubmitHandler}
				/>
				<SuccessModal show={caseSaved} text="Case Saved"></SuccessModal>
				{/* <View style={innerStyles.btnInput}>
					<Input
						placeholder="Hearing Date"
						style={innerStyles.btnInput_input}
						rightIcon={
							<TouchableOpacity style={innerStyles.btnInput_btn}>
								<Icon
									name="calendar-alt"
									color="#031b87"
									size={25}
								/>
							</TouchableOpacity>
						}
					/>
				</View> */}
			</View>
		</ListViewBg>
	);
};

const innerStyles = StyleSheet.create({
	inputWrapper: {
		marginTop: 20,
		paddingBottom: 50,
		paddingHorizontal: 20,
	},
	btnInput: {
		flex: 1,
		flexDirection: "row",
	},
	datePicker: {
		width: "100%",
		flex: 1,
		justifyContent: "center",
		textAlign: "center",
		marginBottom: 10,
	},
});

export default AddNewScreen;
