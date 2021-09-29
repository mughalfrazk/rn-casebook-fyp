import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Modal, StyleSheet, Text, View } from "react-native";

const SuccessModal = (props) => {
	return (
		<Modal animationType="slide" transparent={true} visible={props.show}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Icon name="done-all" color="#031b87" size={60} />
					<Text style={styles.modalText}>{props.text}</Text>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 25,
		alignItems: "center",
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
	},
});

export default SuccessModal;
