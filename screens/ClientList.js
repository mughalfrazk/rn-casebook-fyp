import React from "react";
import { TouchableOpacity } from "react-native";

import ListViewBg from "../shared/components/ListViewBg";
import ClientItem from "../shared/components/ClientItem";

const ClientList = ({ navigation }) => {
  return (
    <ListViewBg title="Client List" back={() => navigation.goBack()}>
      <TouchableOpacity onPress={() => navigation.navigate("CaseView")}>
        <ClientItem title="John Doe" count="1" />
      </TouchableOpacity>
    </ListViewBg>
  );
};

export default ClientList;
