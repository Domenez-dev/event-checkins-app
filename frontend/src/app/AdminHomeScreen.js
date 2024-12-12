import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { router } from "expo-router";
import styles from "./styles";
import { getEvents } from "./appData";
import { globalEvent, globalEvents } from "./globalVar";

const AdminHomeScreen = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = () => {
      // Code here will run after *every* render
      const data = getEvents(); // Simulates fetching events from the backend
      setEvents(data);
    };
    fetchEvents();
  }, []); // Empty dependency array: runs only once when the component mounts

  // Initialize  the shared state (to be precise: variabls):
  globalEvents.events = events;
  globalEvents.setEvents = setEvents;

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>List of Events:</Text>
      <FlatList
        data={events}
        //extract a string index from every item in the data:
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.eventItem}>
            <Text>{item.name}</Text>
            <View style={styles.buttonsContainer}>
              <Button
                title="✖"
                color="#f44336" // Red button
                onPress={() => {
                  // if i!== index, then put it in `updatedParticipants`
                  const updatedevents = events.filter((_, i) => i !== index);
                  setEvents(updatedevents);
                  //DELETE the event from js file also!
                }}
              />
              <Button
                title="View"
                // Pass event data and mode (view)
                onPress={() => {
                  globalEvent.event = item;
                  router.push({
                    pathname: "EventFormScreen",
                    params: { mode: "view" },
                  });
                }}
              />
            </View>
          </View>
        )}
      />
      <Button
        title="Add Event"
        //pass the function as parameter:
        onPress={() => {
          // Pass event data and mode (edit):
          globalEvent.event = null;
          router.push({
            pathname: "EventFormScreen",
            params: { mode: "edit" },
          });
        }}
      />
    </View>
  );
};

export default AdminHomeScreen;