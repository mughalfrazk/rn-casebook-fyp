import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import { supabase } from "../constants/supabase";
import ScreenContainer from "../shared/components/ScreenContainer";
import { useSupabaseClient } from "../shared/hooks/supabase-hook";
import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";
import { capitalize } from "../shared/utils/functions";

const SignupScreen = ({ navigation }) => {
	const { isLoading, runQuery, error, setError } = useSupabaseClient();

	const [name, setName] = useState("");
	const [role, setRole] = useState("lawyer");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const clearInputs = () => {
		setEmail("");
		setPassword("");
		setName("");
	};

	const signupHandlerApi = async () => {
		setError("");
		if (!email || !password || !name) {
			setError("Please fill out the form.");
			setIsLoading(false);
			return;
		}

		try {
			const res = await runQuery(
				supabase.auth.signUp({ email, password }),
			);
			console.log(res);
			createUserApi(res);
		} catch (err) {}
	};

	const createUserApi = async (user) => {
		try {
			const res = await runQuery(
				supabase
					.from("Users")
					.insert({ id: user.id, email, name, role }),
			);
			console.log(res);
			clearInputs();
			navigation.navigate("Login");
		} catch (err) {}
	};

	return (
		<ScreenContainer>
			<Text style={styles.whiteHeading}>
				Signup{"\n"}as {capitalize(role)}
			</Text>
			<Input
				placeholder="Full Name"
				style={textStyles.white}
				value={name}
				onChangeText={(text) => setName(text)}
				leftIcon={
					<Icon
						name="person"
						size={20}
						style={{ marginRight: 6 }}
						color="white"
					/>
				}
			/>
			<Input
				placeholder="Email Address"
				style={textStyles.white}
				autoCapitalize="none"
				value={email}
				onChangeText={(text) => setEmail(text)}
				leftIcon={
					<Icon
						name="email"
						size={18}
						style={{ marginRight: 6 }}
						color="white"
					/>
				}
			/>
			<Input
				placeholder="Password"
				style={textStyles.white}
				value={password}
				onChangeText={(text) => setPassword(text)}
				secureTextEntry
				leftIcon={
					<Icon
						name="lock"
						size={20}
						style={{ marginRight: 5 }}
						color="white"
					/>
				}
			/>
			<View style={innerStyles.selectionArea}>
				<TouchableOpacity
					style={innerStyles.singleSelection}
					onPress={() => setRole("lawyer")}
				>
					<View style={innerStyles.selectionCircle}>
						{role === "lawyer" && (
							<View
								style={innerStyles.selectionInnerCircle}
							></View>
						)}
					</View>
					<Text style={innerStyles.selectionText}>Lawyer</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={innerStyles.singleSelection}
					onPress={() => setRole("client")}
				>
					<View style={innerStyles.selectionCircle}>
						{role !== "lawyer" && (
							<View
								style={innerStyles.selectionInnerCircle}
							></View>
						)}
					</View>
					<Text style={innerStyles.selectionText}>Client</Text>
				</TouchableOpacity>
			</View>
			{!!error && (
				<Text style={[textStyles.yellow, textStyles.h5, styles.mb1]}>
					{error}
				</Text>
			)}
			<Button
				title="Sign up"
				type="outline"
				containerStyle={styles.submitBtnContainer}
				buttonStyle={styles.submitBtn}
				loading={isLoading}
				raised
				onPress={signupHandlerApi}
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

const innerStyles = StyleSheet.create({
	selectionArea: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginBottom: 20,
	},
	selectionText: {
		color: "#fff",
		fontSize: 15,
		textAlign: "left",
		paddingLeft: 10,
	},
	selectionCircle: {
		borderColor: "#fff",
		borderWidth: 2,
		height: 25,
		width: 25,
		borderRadius: 15,
	},
	singleSelection: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	selectionInnerCircle: {
		backgroundColor: "#fff",
		height: 15,
		width: 15,
		margin: 3,
		borderRadius: 10,
	},
});

export default SignupScreen;
