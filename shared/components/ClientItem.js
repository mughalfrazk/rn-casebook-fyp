import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ClientItem = (props) => {
  return (
    <View style={innerStyles.listItem}>
      <Text style={innerStyles.title}>{props.title}</Text>
      <Text style={innerStyles.count}>Number of Cases: {props.count}</Text>
    </View>
  );
};

const innerStyles = StyleSheet.create({
  listItem: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 8,
    borderEndColor: "#031b87",
    borderEndWidth: 4,
  },
  title: {
    fontSize: 18,
    color: "#031b87",
    fontWeight: "bold",
  },
  date: {
    fontSize: 15,
  },
});

export default ClientItem;
