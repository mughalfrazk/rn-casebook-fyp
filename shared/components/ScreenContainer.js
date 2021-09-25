import React from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View } from "react-native";

import { styles } from "../styles/styles";

const ScreenContainer = (props) => {
	return (
		<View style={styles.screenContainer}>
      <KeyboardAwareScrollView
				keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
				}}
			>
				{props.children}
			</KeyboardAwareScrollView>
		</View>
	);
};

export default ScreenContainer;
