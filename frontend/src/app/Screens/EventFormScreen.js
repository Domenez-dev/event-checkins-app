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
      // startDate: new Date(),
      end_date: "",
      location: "",
      participants: [],
    }
  );
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  //CREAT EVENT END POINT:
  const handleSaveEvent = async () => {
    if (!event.name || !event.location || !event.end_date) {
      alert("You should fill in all required fields!");
      return;
    }
    try {
      const token = "711cc97d3850153c6cf1dfebc9f05286a076d6ce";
      const newEvent = await createEvent(
        {
          name: event.name,
          end_date: event.end_date,
          location: event.location,
        },
        token
      );
      //there is a problem in updating this global var (TO FIX!).
      // globalEvents.setEvents((prevEvents) => [...prevEvents, newEvent]);
      alert("Your event has been created successfully!");
      router.back();
    } catch (error) {
      console.error("Error creating event:", error.message);
      alert("Failed to create event.");
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
          value={event[field]}
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
        {/* {renderDateInput("Start Date", "startDate")} */}
        {renderDateInput("End Date", "end_date")}
        {datePickerConfig.visible && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            // minimumDate={
            //   datePickerConfig.field === "end_date"
            //     ? event.start_date
            //     : new Date()
            // }
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
                  <Text>{item.check_in_time == null ? "✖" : "✔"}</Text>
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
