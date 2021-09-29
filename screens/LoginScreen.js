import React, { useContext, useState } from "react";

import { Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ScreenContainer from "../shared/components/ScreenContainer";

import { supabase } from "../constants/supabase";
import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";
import { AuthContext } from "../shared/context/auth-context";
import { useSupabaseClient } from "../shared/hooks/supabase-hook";

const LoginScreen = ({ navigation }) => {
	const auth = useContext(AuthContext);
	const { isLoading, runQuery, error, setError } = useSupabaseClient();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginHandlerApi = async () => {
		setError("");
		if (!email || !password) {
			setError("Please fill out the form.");
			setIsLoading(false);
			return;
		}

		try {
			const res = await runQuery(
				supabase.auth.signIn({ email, password }),
			);
			getUserApi(res);
		} catch (error) {}
	};

	const getUserApi = async (authData) => {
		try {
			const res = await runQuery(
				supabase.from("Users").select("*").eq("id", authData?.user?.id),
			);
			auth.login({
				uid: res[0]?.id,
				email: res[0]?.email,
				name: res[0]?.name,
				role: res[0]?.role,
				access_token: authData?.access_token,
				refresh_token: authData?.refresh_token,
				expires_in: authData?.expires_in,
				expires_at: authData?.expires_at,
			});
		} catch (error) {}
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
			{!!error && <Text style={[textStyles.yellow, textStyles.h5, styles.mb1]}>
				{error}
			</Text>}
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
