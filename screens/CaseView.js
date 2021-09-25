import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";
import ListViewBg from "../shared/components/ListViewBg";
import CaseItemList from "../shared/components/CaseListItem";
import { AuthContext } from "../shared/context/auth-context";
import { capitalize } from "../shared/utils/functions";

const Caseview = ({ navigation }) => {
	const auth = useContext(AuthContext);

	const caseData = {
		id: "3f94787d-a51e-44db-acf4-deac0322c823",
		created_at: "2021-09-23T06:43:08+00:00",
		updated_at: "2021-09-23T06:43:08+00:00",
		title: "People vs John Doe",
		hearing_date: '25-9-21',
		case_type: "Murder Case",
		on_behalf: "Relative",
		case_no: "8765648987979",
		filed_u: "D",
		user_id: "7fc9da49-2967-4fab-9cc6-e5b2cfd3b1df",
		client_id: 1,
		court_id: 1,
	};

	return (
		<ListViewBg title="Case View" back={() => navigation.goBack()}>
			<View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Title:</Text>
				<Text style={textStyles.h3}>{caseData.title}</Text>
			</View>
			<View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Hearing Date:</Text>
				<Text style={textStyles.h3}>{caseData.hearing_date}</Text>
			</View>
      <View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Case Type:</Text>
				<Text style={textStyles.h3}>{caseData.case_type}</Text>
			</View>
      <View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>On Behalf:</Text>
				<Text style={textStyles.h3}>{caseData.on_behalf}</Text>
			</View>
      <View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Case no:</Text>
				<Text style={textStyles.h3}>{caseData.case_no}</Text>
			</View>
      <View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Filed U:</Text>
				<Text style={textStyles.h3}>{caseData.filed_u}</Text>
			</View>
      <View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Client name:</Text>
				<Text style={textStyles.h3}>{'Hafiz Ahmed'}</Text>
			</View>
		</ListViewBg>
	);
};

const innerStyles = StyleSheet.create({
	content: {
		paddingTop: 20,
	},
});

export default Caseview;
