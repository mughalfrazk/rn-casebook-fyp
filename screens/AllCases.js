import React from "react";
import { TouchableOpacity } from "react-native";

import ListViewBg from "../shared/components/ListViewBg";
import CaseItemList from "../shared/components/CaseListItem";

const AllCases = ({ navigation }) => {
  return (
    <ListViewBg title="All Cases" back={() => navigation.goBack()}>
      <TouchableOpacity onPress={() => navigation.navigate("CaseView")}>
        <CaseItemList title="People vs John Doe" date="12-03-22" />
      </TouchableOpacity>
    </ListViewBg>
  );
};

export default AllCases;
