import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";

import { styles } from "../styles/styles";

const ListViewBg = (props) => {
	return (
		<View style={innerStyles.innerScreenContainer}>
			<View style={innerStyles.topSection}>
				<View style={innerStyles.heaading}>
					<TouchableOpacity onPress={props.back}>
						<Icon
							name="arrow-back-ios"
							size={20}
							color="#fff"
							style={innerStyles.backIcon}
						/>
					</TouchableOpacity>
					<Text style={styles.whiteHeading}>{props.title}</Text>
				</View>
				{props.loading === true && (
					<ActivityIndicator
						style={{ marginBottom: 5 }}
						color="#ffffff"
					/>
				)}
			</View>
			<KeyboardAwareScrollView style={innerStyles.scrollContainer}>
				<View style={innerStyles.bottomSection}>{props.children}</View>
			</KeyboardAwareScrollView>
		</View>
	);
};

const innerStyles = StyleSheet.create({
	innerScreenContainer: {
		flex: 1,
		backgroundColor: "white",
	},
	topSection: {
		backgroundColor: "#031b87",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 40,
		height: 90,
		zIndex: 0,
	},
	heaading: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	bottomSection: {
		paddingBottom: 20,
	},
	backIcon: {
		paddingRight: 5,
		paddingBottom: 7,
	},
});

export default ListViewBg;
