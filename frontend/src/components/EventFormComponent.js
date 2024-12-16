import { useState, useEffect } from "react";
import { getParticipants } from "../app/appData";

export const EventFormComponent = ({ setEvent }) => {
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
    date = selectedDate.toISOString().split('T')[0]; //from Date to string.
    if (!date) {
      setDatePickerConfig({ visible: false, field: "" });
      return;
    }
    setEvent((prev) => ({ ...prev, [datePickerConfig.field]: date}));
    setDatePickerConfig({ visible: false, field: "" });
  };

  return {
    participants,
    datePickerConfig,
    showDatePicker,
    handleDateChange,
  };
};
