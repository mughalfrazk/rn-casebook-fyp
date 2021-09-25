import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Input, Button } from "react-native-elements";

import ListViewBg from "../shared/components/ListViewBg";

const AddNewScreen = ({ navigation }) => {
  const clearData = () => {
    navigation.navigate('Dashboard')
  }

  return (
    <ListViewBg title="Add New Case" back={() => navigation.goBack()}>
      <View style={innerStyles.inputWrapper}>
        <Input placeholder="Case Title" />
        <Input placeholder="Case Name" />
        <View style={innerStyles.btnInput}>
          <Input
            placeholder="Hearing Date"
            style={innerStyles.btnInput_input}
            rightIcon={
              <TouchableOpacity style={innerStyles.btnInput_btn}>
                <Icon name="calendar-alt" color="#031b87" size={25} />
              </TouchableOpacity>
            }
          />
        </View>
        <Input placeholder="Case Type" />
        <Input placeholder="On Behalf of" />
        <Input placeholder="Case No." />
        <Input placeholder="Party Name" />
        <Input placeholder="Contact No." />
        <Input placeholder="Filed U/Sec" />
        <Button title="Submit" onPress={clearData} />
      </View>
    </ListViewBg>
  );
};

const innerStyles = StyleSheet.create({
  inputWrapper: {
    marginTop: 20,
  },
  btnInput: {
    flex: 1,
    flexDirection: "row",
  },
});

export default AddNewScreen;
