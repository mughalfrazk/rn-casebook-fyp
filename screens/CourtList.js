import React from "react";
import { TouchableOpacity } from "react-native";

import ListViewBg from "../shared/components/ListViewBg";
import ClientItem from "../shared/components/ClientItem";

const CourtList = ({ navigation }) => {
  return (
    <ListViewBg title="Court List" back={() => navigation.goBack()}>
      <TouchableOpacity onPress={() => navigation.navigate("CaseView")}>
        <ClientItem title="Lahore High Court" count="1" />
      </TouchableOpacity>
    </ListViewBg>
  );
};

export default CourtList;
