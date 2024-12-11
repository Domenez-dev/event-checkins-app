import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    marginBottom: "10",
    marginTop: "40",
  },
  modalContent: {
    flex: 1,
    padding: 20,
    gap: "10",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  eventsList: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

 participantItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#add8e6',
  },
  participantText: {
    fontSize: 16,
  },
});

export default styles;