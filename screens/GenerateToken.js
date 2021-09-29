import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Clipboard,
} from "react-native";

import ListViewBg from "../shared/components/ListViewBg";
import { styles } from "../shared/styles/styles";

const GenerateToken = ({ navigation, route }) => {
	const caseId = route.params.caseId;
	const [copyText, setCopiedText] = useState(false);

	const fetchCopiedText = async () => {
		Clipboard.setString(caseId);
		setCopiedText(true);
	};

	return (
		<ListViewBg title="Send Token" back={() => navigation.goBack()}>
			<TouchableOpacity
				style={innerStyles.token}
				onPress={fetchCopiedText}
			>
				<Text>{caseId}</Text>
			</TouchableOpacity>
			<Text style={innerStyles.metaText}>
				{copyText ? "Text Copied!" : "Click to copy text."}
			</Text>
		</ListViewBg>
	);
};

const innerStyles = StyleSheet.create({
	token: {
		backgroundColor: "#dfdfdf",
		padding: 10,
		margin: 10,
		borderRadius: 10,
		borderColor: "#d8d8d8",
		borderWidth: 1,
	},
	metaText: {
		textAlign: "center",
		fontStyle: "italic",
	},
});

export default GenerateToken;
