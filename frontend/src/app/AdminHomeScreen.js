import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";
import styles from "./styles";
import { getEvents } from "./appData";

const AdminHomeScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = () => {
      const data = getEvents(); // Simulates fetching events from the backend
      setEvents(data);
    };
    fetchEvents();
  }, []); // Empty dependency array: runs only once when the component mounts

  // Update events when returning to HomeScreen
  useEffect(() => {
    if (router?.params?.event) {
      setEvents((prevEvents) => [...prevEvents, router.params.event]);
    }
  }, [router.params?.event]);

  return (
    <View style={styles.container}>
      {/*Home Section*/}
      <Text style={styles.modalTitle}>List of Events:</Text>
      <FlatList
        data={events}
        //extract a string index from every item in the data:
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.eventItem}>
            <Text>{item.name}</Text>
            <Button
              title="X"
              color="#f44336" // Red button
              onPress={() => {
                // if i!== index, then put it in `updatedParticipants`
                const updatedevents = events.filter((_, i) => i !== index);
                setEvents(updatedevents);
                //delete the event from js file also.
              }}
            />
          </View>
        )}
      />
      <Button
        title="Add Event"
        //pass the function as parameter:
        onPress={() => router.push("EventFormScreen")}
      />
    </View>
  );
};

export default AdminHomeScreen;
