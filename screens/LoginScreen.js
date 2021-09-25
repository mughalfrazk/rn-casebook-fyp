import React, { useContext, useState } from "react";

import { Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ScreenContainer from "../shared/components/ScreenContainer";

import { supabase } from "../constants/supabase";
import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";
import { AuthContext } from "../shared/context/auth-context";

const LoginScreen = ({ navigation }) => {
	const auth = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const loginHandlerApi = () => {
		setIsLoading(true);
		setError("");
		if (!email || !password) {
			setError("Please fill out the form.");
			setIsLoading(false);
			return;
		}

		supabase.auth.signIn({ email, password }).then(({ data, error }) => {
			if (error) {
				console.log(error);
				setError(error.message);
			} else {
				getUserApi(data);
			}
		});
	};

	const getUserApi = async (authData) => {
		supabase
			.from("Users")
			.select("*")
			.eq("id", authData?.user?.id)
			.then(({ data, error }) => {
				if (error) {
					console.log(error);
					setError(error.message);
				} else {
					if (data.length === 0) {
						setError("No User Found.");
						setIsLoading(false);
					} else {
						auth.login({
							uid: data[0]?.id,
							email: data[0]?.email,
							name: data[0]?.name,
							role: data[0]?.role,
							token: authData?.user?.token
						});
						navigation.navigate("Dashboard");
						setIsLoading(false);	
					}
				}
			});
	};

	return (
		<ScreenContainer>
			<Text style={styles.whiteHeading}>
				Login into{"\n"}your Account
			</Text>
			<Input
				placeholder="Email Address"
				style={textStyles.white}
				value={email}
				onChangeText={(text) => setEmail(text)}
				autoCapitalize="none"
				leftIcon={
					<Icon
						name="person"
						size={22}
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
			<Text style={[textStyles.yellow, textStyles.h5, styles.mb1]}>
				{error}
			</Text>
			<Button
				title="Login"
				type="outline"
				containerStyle={styles.submitBtnContainer}
				buttonStyle={styles.submitBtn}
				loading={isLoading}
				raised
				onPress={loginHandlerApi}
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

export default LoginScreen;
