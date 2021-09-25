import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ProfileBg = (props) => {
  return (
    <View style={styles.innerScreenContainer}>
      <View style={styles.topSection}>{props.title}</View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.bottomSection}>{props.children}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  innerScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topSection: {
    backgroundColor: "#031b87",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    height: 120,
    zIndex: 0,
  },
  bottomSection: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default ProfileBg;
