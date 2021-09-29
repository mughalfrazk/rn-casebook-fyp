import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

import ProfileBg from "../shared/components/ProfileBg";
import { AuthContext } from "../shared/context/auth-context";
import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";
import { capitalize } from "../shared/utils/functions";

const ProfileScreen = ({ navigation }) => {
	const auth = useContext(AuthContext);

	return (
		<ProfileBg
			title={
				<React.Fragment>
					<Text
						style={[
							textStyles.h3,
							textStyles.white,
							textStyles.bold,
						]}
					>
						Name:
					</Text>
					<Text style={[styles.whiteHeading]}>{auth.name}</Text>
				</React.Fragment>
			}
		>
			<View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Email:</Text>
				<Text style={textStyles.h3}>{auth.email}</Text>
			</View>
			<View style={innerStyles.content}>
				<Text style={[textStyles.h5, textStyles.bold]}>Role:</Text>
				<Text style={textStyles.h3}>{capitalize(auth.role)}</Text>
			</View>
			<Button
				title="Logout"
				style={{ marginTop: 20 }}
				onPress={() => {
					auth.logout();
				}}
			/>
		</ProfileBg>
	);
};

const innerStyles = StyleSheet.create({
	content: {
		paddingTop: 20,
	},
});

export default ProfileScreen;
