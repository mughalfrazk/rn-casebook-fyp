import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import { supabase } from "../constants/supabase";
import ScreenContainer from "../shared/components/ScreenContainer";
import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";

const SignupScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [role, setRole] = useState("lawyer");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const signupHandlerApi = async () => {
		setIsLoading(true);
		setError("");
		if (!email || !password || !name) {
			setError("Please fill out the form.");
			setIsLoading(false);
			return;
		}

		const { error, user } = await supabase.auth.signUp({ email, password });
    console.log(user)
    console.log(error)
		if (error) setError(error.message);
		else createUserApi(user);
		setIsLoading(false);
	};

	const createUserApi = async (user) => {
    const { data, error } = await supabase.from('Users').insert({ id: user.id, email, name, role: 'lawyer',  })
    console.log(data)

    if (error) setError(error.message)
    else {
      setEmail("");
      setPassword("");
      setName("");
      navigation.navigate("Login");
    }
    setIsLoading(false);
	};

	return (
		<ScreenContainer>
			<Text style={styles.whiteHeading}>Signup{"\n"}as Lawyer</Text>
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
			<Text style={[textStyles.yellow, textStyles.h5, styles.mb1]}>
				{error}
			</Text>
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

export default SignupScreen;
