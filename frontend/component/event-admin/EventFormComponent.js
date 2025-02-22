import { useState, useEffect } from "react";
import { getParticipants } from "./appData";

export const EventFormComponent = ({
  setEvent,
}) => {
  // Participants state
  const [participants, setParticipants] = useState([]);
  //We should fetch all participants!
  useEffect(() => {
    const fetchParticipants = () => {
      const data = getParticipants();
      setParticipants(data);
    };
    fetchParticipants();
  }, []);
 
  // Date picker state
  const [datePickerConfig, setDatePickerConfig] = useState({
    visible: false,
    field: "",
  });

  const showDatePicker = (field) => {
    setDatePickerConfig({ visible: true, field });
  };

  const handleDateChange = (event, selectedDate) => {
    if (!selectedDate) {
      setDatePickerConfig({ visible: false, field: "" });
      return;
    }
    setEvent((prev) => ({ ...prev, [datePickerConfig.field]: selectedDate }));
    setDatePickerConfig({ visible: false, field: "" });
  };

  return {
    participants,
    datePickerConfig,
    showDatePicker,
    handleDateChange,
  };
};
