import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { router } from "expo-router";
import styles from "../styles";
import { globalEvent, globalEvents } from "../globalVar";
import { fetchEvents, fetchEventDetails } from "../apiService";

const AdminHomeScreen = () => {
  const [events, setEvents] = useState([]);
  //NOTES:
  //We need to fetch the list of all participants, in EventFormComponent.

  //LIST EVENT END POINT:
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const token = "711cc97d3850153c6cf1dfebc9f05286a076d6ce"; //after merging
        const eventsData = await fetchEvents(token);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error.message);
        alert("Failed to fetch events.");
      }
    };
    fetchEventsData();
  }, []);

  //Event Details (Participants):
  const viewEventDetails = async (eventId) => {
    try {
      const token = "711cc97d3850153c6cf1dfebc9f05286a076d6ce"; //after merging
      const details = await fetchEventDetails(eventId, token);
      //update participants:
      globalEvent.event = {
        ...globalEvent.event,
        participants: details.participants || [],
      };
      router.push({
        pathname: "Screens/EventFormScreen",
        params: { mode: "view" },
      });
    } catch (error) {
      console.error("Error fetching event details:", error.message);
      alert("Failed to load event details.");
    }
  };

  // Initialize  the shared state (to be precise: variabls):
  globalEvents.events = events;
  globalEvents.setEvents = setEvents;

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>List of Events:</Text>
      <FlatList
        data={events["events"]}
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
                  //DELETE END POINT?
                }}
              />
              <Button
                title="View"
                // Pass event data and mode (view)
                onPress={() => {
                  globalEvent.event = item;
                  viewEventDetails(item.id);
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
            pathname: "Screens/EventFormScreen",
            params: { mode: "edit" },
          });
        }}
      />
    </View>
  );
};

export default AdminHomeScreen;
