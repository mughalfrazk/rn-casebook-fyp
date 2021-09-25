import React from "react";
import { Text, TouchableOpacity } from "react-native";

import ListViewBg from "../shared/components/ListViewBg";
import CaseItemList from "../shared/components/CaseListItem";
import { styles } from "../shared/styles/styles";

const UpcomingDates = ({ navigation }) => {
  return (
    <ListViewBg title="Upcoming Dates" back={() => navigation.goBack()}>
      <TouchableOpacity onPress={() => navigation.navigate("CaseView")}>
        <CaseItemList title="People vs John Doe" date="23-09-21" />
      </TouchableOpacity>
    </ListViewBg>
  );
};

export default UpcomingDates;
