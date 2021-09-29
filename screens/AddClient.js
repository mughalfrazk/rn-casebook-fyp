import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	FlatList,
	Modal,
} from "react-native";
import { Button } from "react-native-elements";

import { supabase } from "../constants/supabase";
import StaticViewBg from "../shared/components/StaticViewBg";
import { useSupabaseClient } from "../shared/hooks/supabase-hook";
import ClientItem from "../shared/components/ClientItem";
import NoData from "../shared/components/NoData";
import { styles } from "../shared/styles/styles";
import { textStyles } from "../shared/styles/text";

const AddClient = ({ navigation, route }) => {
	const caseId = route.params.caseId;
	const { isLoading, runQuery, error, setError } = useSupabaseClient();
	let addClientInputValues = {
		access_type: 0,
		case_id: caseId,
		client_id: "",
	};

	const [clientsList, setClientsList] = useState([]);
	const [addedClientsList, setAddedClientsList] = useState([]);
	const [addClientModal, setAddClientModal] = useState(false);
	const [clientAddedErr, setClientAddedErr] = useState("");
	const [selectedClient, setSelectedClient] = useState({
		email: "",
		name: "",
	});
	const [addClientInput, setAddClientInput] = useState(addClientInputValues);

	const [deleteClientModal, setDeleteClientModal] = useState(false);

	const getClientsApi = async () => {
		try {
			const res = await runQuery(
				supabase.from("Users").select("*").eq("role", "client"),
			);
			setError("");
			setClientsList(res);
		} catch (err) {
			console.log(err);
		}
	};

	const addClientHandler = async () => {
		console.log(caseId);
		console.log(addClientInput.client_id);

		setClientAddedErr("");
		try {
			const checkClient = await runQuery(
				supabase
					.from("CasesVClients")
					.select("*")
					.eq("case_id", caseId)
					.eq("client_id", addClientInput.client_id),
			);
			console.log(checkClient);
			if (checkClient.length !== 0) {
				setClientAddedErr("Client Already Added!");
				return;
			}
		} catch (err) {}
		try {
			const res = await runQuery(
				supabase.from("CasesVClients").insert(addClientInput),
			);
			console.log(res);
			setAddClientModal(false);
			getAlreadyAddedClients();
		} catch (err) {}
	};

	const getAlreadyAddedClients = async () => {
		try {
			const res = await runQuery(
				supabase
					.from("CasesVClients")
					.select("*, client_id(id, name, email)")
					.eq("case_id", caseId),
			);
			setError("");
			setAddedClientsList(res);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteAlreadyAddedClients = async () => {
		console.log(caseId);
		console.log(addClientInput.client_id);

		try {
			const res = await runQuery(
				supabase
					.from("CasesVClients")
					.delete()
					.eq("case_id", caseId)
					.eq("client_id", addClientInput.client_id),
			);
			setError("");
			console.log(res);
			console.log("Deleted");
			getAlreadyAddedClients();
			setDeleteClientModal();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getClientsApi();
		getAlreadyAddedClients();
	}, []);

	return (
		<StaticViewBg
			title="All Cases"
			loading={isLoading}
			back={() => navigation.goBack()}
		>
			{!!error && (
				<Text style={[textStyles.red, textStyles.h5, styles.mb1]}>
					{error}
				</Text>
			)}
			{clientsList.length !== 0 ? (
				<FlatList
					style={{
						width: Dimensions.get("window").width,
						height: 100,
					}}
					data={clientsList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={innerStyles.singlePill}
							onPress={() => {
								setAddClientModal(true);
								setSelectedClient({
									name: item.name,
									email: item.email,
								});
								setAddClientInput({
									...addClientInput,
									client_id: item.id,
								});
							}}
						>
							<ClientItem title={item.name} email={item.email} />
						</TouchableOpacity>
					)}
				/>
			) : (
				<NoData />
			)}
			<Text style={[textStyles.h2, textStyles.bold, innerStyles.heading]}>
				Added Clients
			</Text>
			{clientsList.length !== 0 ? (
				<FlatList
					style={{
						width: Dimensions.get("window").width,
						height: 100,
					}}
					data={addedClientsList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={innerStyles.singlePill}
							onPress={() => {
								setDeleteClientModal(true);
								setSelectedClient({
									name: item.client_id.name,
									email: item.client_id.email,
								});
								setAddClientInput({
									...addClientInput,
									client_id: item.client_id.id,
								});
							}}
						>
							<ClientItem
								title={item.client_id.name}
								email={item.client_id.email}
							/>
						</TouchableOpacity>
					)}
				/>
			) : (
				<NoData />
			)}

			<Modal
				animationType="slide"
				transparent={true}
				visible={addClientModal}
			>
				<View style={innerStyles.centeredView}>
					<View style={innerStyles.modalView}>
						<Text style={[textStyles.h3, textStyles.bold]}>
							{selectedClient.name}
						</Text>
						<Text>{selectedClient.email}</Text>
						{!!clientAddedErr && (
							<Text
								style={[
									textStyles.red,
									textStyles.h5,
									styles.mb1,
								]}
							>
								{clientAddedErr}
							</Text>
						)}
						<Button
							title="Add Client"
							loading={isLoading}
							onPress={addClientHandler}
							style={innerStyles.clientSubmitBtn}
						/>
						<Button
							title="Close"
							loading={isLoading}
							onPress={() => {
								setClientAddedErr("");
								setAddClientModal(false);
							}}
							style={innerStyles.clientSubmitBtn}
						/>
					</View>
				</View>
			</Modal>

			<Modal
				animationType="slide"
				transparent={true}
				visible={deleteClientModal}
			>
				<View style={innerStyles.centeredView}>
					<View style={innerStyles.modalView}>
						<Text style={[textStyles.h3, textStyles.bold]}>
							{selectedClient.name}
						</Text>
						<Text>{selectedClient.email}</Text>
						{!!clientAddedErr && (
							<Text
								style={[
									textStyles.red,
									textStyles.h5,
									styles.mb1,
								]}
							>
								{clientAddedErr}
							</Text>
						)}
						<Button
							title="Delete Client"
							loading={isLoading}
							onPress={deleteAlreadyAddedClients}
							style={innerStyles.clientSubmitBtn}
						/>
						<Button
							title="Close"
							loading={isLoading}
							onPress={() => {
								setClientAddedErr("");
								setDeleteClientModal(false);
							}}
							style={innerStyles.clientSubmitBtn}
						/>
					</View>
				</View>
			</Modal>
		</StaticViewBg>
	);
};

const innerStyles = StyleSheet.create({
	modalView: {
		margin: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		alignContent: "stretch",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 5,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	listArea: {
		borderColor: "red",
		borderWidth: 5,
		flex: 1,
		width: Dimensions.get("window").width,
	},
	singlePill: {
		alignSelf: "stretch",
		paddingHorizontal: 10,
	},
	clientSubmitBtn: {
		marginTop: 10,
	},
	heading: {
		color: "#afafaf",
		paddingLeft: 20,
	},
});

export default AddClient;
