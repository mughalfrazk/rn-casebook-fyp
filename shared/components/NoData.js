import React from "react";
import Icon from "react-native-vector-icons/Foundation";
import { StyleSheet, View, Text } from "react-native";

const NoData = (props) => {
	return (
		<View style={innerStyles.error}>
			<View style={innerStyles.errorInner}>
				<Icon name="database" color="#a0a6af" size={100} />
				<Text style={innerStyles.count}>No Data Found</Text>
			</View>
		</View>
	);
};

const innerStyles = StyleSheet.create({
	error: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: 'center'
	},
	errorInner: {
		flex: 1,
		justifyContent: "center",
		alignItems: 'center'
	},
	title: {
		fontSize: 18,
		color: "#031b87",
		fontWeight: "bold",
	},
	date: {
		fontSize: 15,
	},
});

export default NoData;
