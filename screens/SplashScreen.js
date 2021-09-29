import React, { useContext } from "react";
import { Text, View, Image } from "react-native";
import { Button } from "react-native-elements";

import splash from "../assets/splash-img.png";
import ScreenContainer from "../shared/components/ScreenContainer";
import { AuthContext } from "../shared/context/auth-context";
import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";

const SplashScreen = ({ navigation }) => {
    const auth = useContext(AuthContext);

    // console.log(auth)

  return (
    <ScreenContainer>
      <View style={styles.imgContainer}>
        <Image style={styles.splashImg} source={splash} />
      </View>
      <Text style={styles.whiteHeading}>Welcome{"\n"}to Casebook</Text>
      <Button
        title="Login"
        type="outline"
        containerStyle={styles.submitBtnContainer}
        buttonStyle={styles.submitBtn}
        raised
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Register"
        type="outline"
        containerStyle={styles.submitBtnContainer}
        buttonStyle={styles.submitBtn}
        raised
        onPress={() => navigation.navigate("Signup")}
      />
      <Button
        title="Guest"
        type="outline"
        containerStyle={styles.submitBtnContainer}
        buttonStyle={styles.submitBtn}
        raised
        onPress={() => navigation.navigate("Guest")}
      />
    </ScreenContainer>
  );
};

export default SplashScreen;
