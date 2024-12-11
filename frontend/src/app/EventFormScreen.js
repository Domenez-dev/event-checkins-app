import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";
import { router } from "expo-router";
//import the logic of EventForm:
import { EventFormComponent } from "../components/EventFormComponent";
import { addEvent } from "./appData";

const EventFormScreen = () => {
  //These are the main states of the Screen,
  //it should be there, or we'll have some troubles,
  //with alerts, routes and general management.
  const [event, setEvent] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    participants: [],
  });
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const handleSaveEvent = () => {
    if (
      !event.name ||
      !event.description ||
      !event.location ||
      selectedParticipants.length === 0
    ) {
      alert("You should fill everything!");
    } else {
      alert("Your event has been saved!");
      addEvent(event);
      //return the new event to Home Screen:
      router.push({ pathname: "AdminHomeScreen", params: { event } });
    }
  };
  const handleSelectParticipant = (participant) => {
    if (selectedParticipants.find((p) => p.id === participant.id)) {
      setSelectedParticipants((prev) =>
        prev.filter((p) => p.id !== participant.id)
      );
    } else {
      setSelectedParticipants((prev) => [...prev, participant]);
      //save the selected participant every change:
      setEvent({
        ...event,
        participants: [...selectedParticipants, participant],
      });
    }
  };

  // Call the EventFormComponent logic
  const { participants, datePickerConfig, showDatePicker, handleDateChange } =
    EventFormComponent({
      setEvent,
    });

  const renderDateInput = (label, field) => (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <TouchableWithoutFeedback>
        <TextInput
          style={styles.input}
          value={event[field].toDateString()}
          placeholder={event[field].toDateString()}
          onPressIn={() => showDatePicker(field)}
          pointerEvents="none"
        />
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add Event</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          value={event.name}
          onChangeText={(text) => setEvent({ ...event, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={event.description}
          onChangeText={(text) => setEvent({ ...event, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={event.location}
          onChangeText={(text) => setEvent({ ...event, location: text })}
        />

        {renderDateInput("Start Date", "startDate")}
        {renderDateInput("End Date", "endDate")}
        {datePickerConfig.visible && (
          <DateTimePicker
            value={event[datePickerConfig.field]}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={
              datePickerConfig.field === "endDate"
                ? event.startDate
                : new Date()
            }
          />
        )}

        <Text style={styles.label}>Add participants:</Text>
        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.participantItem,
                selectedParticipants.find((p) => p.id === item.id) &&
                  styles.selectedItem,
              ]}
              onPress={() => handleSelectParticipant(item)}
            >
              <Text style={styles.participantText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <Button title="Save Event" onPress={handleSaveEvent} />
        <Button title="Cancel" onPress={() => router.back()} />
      </View>
    </View>
  );
};

export default EventFormScreen;
