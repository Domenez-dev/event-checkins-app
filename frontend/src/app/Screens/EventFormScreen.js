import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles";
import { router, useLocalSearchParams } from "expo-router";
//import the logic of EventForm:
import { EventFormComponent } from "../../components/EventFormComponent";
import { addEvent } from "../appData";
import { globalEvent, globalEvents } from "../globalVar";
import { createEvent } from "../apiService";

const EventFormScreen = () => {
  const { mode } = useLocalSearchParams();
  //These are the main states of the Screen,
  //it should be there, or we'll have some troubles,
  //with alerts, routes and general management.

  //if the globalEvent is null, in the case of adding a new event,
  //it'll take an empty object.
  const [event, setEvent] = useState(
    globalEvent.event || {
      name: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      participants: [],
    }
  );
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  //CREAT EVENT END POINT:
  // const handleSaveEvent = async () => {
  //   if (!event.name || !event.location) {
  //     alert("You should fill in all required fields!");
  //     return;
  //   }
  //   try {
  //     const token = "auth-token";
  //     const newEvent = await createEvent(
  //       {
  //         name: event.name,
  //         date: event.startDate.toISOString().split("T")[0], // Convert date to 'YYYY-MM-DD'
  //         location: event.location,
  //       },
  //       token
  //     );
  //     globalEvents.setEvents((prevEvents) => [...prevEvents, newEvent]);
  //     alert("Your event has been created successfully!");
  //     router.back();
  //   } catch (error) {
  //     console.error("Error creating event:", error.message);
  //     alert("Failed to create event.");
  //   }
  // };
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
      // ADD the new event to the js file!
      //addEvent(event);
      console.log("Event: ", event);
      //return the new event to Home Screen:
      globalEvents.setEvents((prevEvents) => [...prevEvents, event]);
      router.back();
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
      <TouchableOpacity
        onPress={() => {
          if (mode === "edit") showDatePicker(field);
        }}
      >
        <TextInput
          style={styles.input}
          value={event[field].toDateString()}
          editable={false} // Editable only in "edit" mode
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          {mode === "edit" ? "Event" : "View Event"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          value={event.name}
          onChangeText={(text) => setEvent({ ...event, name: text })}
          editable={mode === "edit"} // Editable only in "edit" mode
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={event.description}
          onChangeText={(text) => setEvent({ ...event, description: text })}
          editable={mode === "edit"} // Editable only in "edit" mode
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={event.location}
          onChangeText={(text) => setEvent({ ...event, location: text })}
          editable={mode === "edit"} // Editable only in "edit" mode
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
        {mode === "view" && (
          <>
            <Text style={styles.label}>Participants and their status:</Text>
            <FlatList
              // style={styles.eventsList}
              data={event.participants}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.eventItem}>
                  <Text>{item.name}</Text>
                  <Text>{item.checked ? "✔" : "✖"}</Text>
                </View>
              )}
            />
          </>
        )}
        {mode === "edit" && (
          <>
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
                  disabled={mode !== "edit"} // Disable participant selection in "view" mode
                >
                  <Text style={styles.participantText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}
        {mode === "edit" && (
          <Button title="Save Event" onPress={handleSaveEvent} />
        )}
        <Button title="Cancel" onPress={() => router.back()} />
      </View>
    </View>
  );
};

export default EventFormScreen;
