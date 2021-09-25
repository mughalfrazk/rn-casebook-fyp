import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const DashboardBg = (props) => {
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
    height: 200,
    zIndex: 0,
  },
  scrollContainer: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    marginTop: 120,
  },
  bottomSection: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default DashboardBg;
