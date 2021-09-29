import React, { useContext, useState } from "react";
import { Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ScreenContainer from "../shared/components/ScreenContainer";

import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";

const GuestScreen = ({ navigation }) => {
	const [token, setToken] = useState("");
	const [error, setError] = useState("");

	const getCaseData = () => {
		if (!token) {
			setError("Please enter a token");
			return;
		}

		navigation.navigate("PublicCaseView", {
			case_id: token,
			access_type: 0,
		});
	};

	return (
		<ScreenContainer>
			<Text style={styles.whiteHeading}>
				Check status{"\n"}for your Case
			</Text>
			<Input
				placeholder="Case Token"
				style={textStyles.white}
				value={setToken}
				onChangeText={(text) => setToken(text)}
				leftIcon={
					<Icon
						name="lock"
						size={22}
						style={{ marginRight: 6 }}
						color="white"
					/>
				}
			/>
			<Text style={[textStyles.yellow, textStyles.h5, styles.mb1]}>
				{error}
			</Text>
			<Button
				title="Authorize"
				type="outline"
				containerStyle={styles.submitBtnContainer}
				buttonStyle={styles.submitBtn}
				onPress={getCaseData}
				raised
			/>
			<Button
				type="clear"
				title="Back"
				onPress={() => navigation.goBack()}
				icon={
					<Icon
						name="arrow-left"
						size={30}
						color="#159ded"
						style={{ marginRight: 0 }}
					/>
				}
			/>
		</ScreenContainer>
	);
};

export default GuestScreen;
