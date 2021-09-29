import React from "react";
import { View, Text } from "react-native";
import ListViewBg from "../shared/components/ListViewBg";

import { styles } from "../shared/styles/styles";

const AddLawyer = ({ navigation }) => {
  return (
    <ListViewBg title="Add Lawyer" back={() => navigation.goBack()} ></ListViewBg>
  );
};

export default AddLawyer;
