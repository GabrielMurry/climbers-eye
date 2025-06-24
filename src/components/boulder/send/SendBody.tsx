import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import DefaultRow from "./rows/DefaultRow";
import DifficultyRow from "./rows/DifficultyRow";
import AttemptsRow from "./rows/AttemptsRow";
import QualityRow from "./rows/QualityRow";
import NotesRow from "./rows/NotesRow";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { addSendToBoulder } from "../../../services/send";
import { Boulder } from "../../../utils/types/boulder";
import { UserSendsData } from "../../../screens/boulder/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/features/user/userSelectors";
import { colors, padding } from "../../../utils/styles";
import CommonSubmitButton from "../../common/CommonSubmitButton";
import { updateBoulder } from "../../../redux/features/boulder/boulderSlice";

type SendBodyProps = {
  boulder: Boulder;
  userSendsData: UserSendsData[];
};

const SendBody: React.FC<SendBodyProps> = ({ boulder, userSendsData }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => selectUser(state));

  const [selectedAttempts, setSelectedAttempts] = useState("-");
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    boulder.grade ?? "-"
  );
  const [qualityCount, setQualityCount] = useState(0);
  const [notes, setNotes] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (
      selectedAttempts !== "-" &&
      selectedDifficulty !== "-" &&
      qualityCount !== null
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [selectedAttempts, selectedDifficulty, qualityCount]);

  const handleSubmit = async () => {
    // Post request to add a Send model instance (row)
    // Returns a response of the updated Boulder instance
    // Dispatch that updated boulder to reflect immediate changes to the boulder
    const data = {
      attempts: selectedAttempts,
      suggestedGrade: selectedDifficulty,
      quality: qualityCount,
      notes: notes,
      person: user.id,
      boulder: boulder.id,
    };
    const pathParams = { boulderId: boulder.id };
    const response = await addSendToBoulder(pathParams, data);
    dispatch(updateBoulder(boulder.id, response.data));
    handleVibrate();
    navigation.goBack();
  };

  const handleVibrate = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
      >
        <View style={{ gap: 5 }}>
          <DefaultRow label="Boulder" value={boulder.name} />
          <DefaultRow label="Username" value={user.username} />
          <DefaultRow label="Date" value={new Date().toLocaleString()} />
          <DefaultRow label="Your Ascents" value={userSendsData.length} />
          <AttemptsRow
            value={selectedAttempts}
            setValue={setSelectedAttempts}
          />
          <DifficultyRow
            value={selectedDifficulty}
            setValue={setSelectedDifficulty}
          />
          <QualityRow value={qualityCount} setValue={setQualityCount} />
          <NotesRow value={notes} setValue={setNotes} />
        </View>
        <View style={{ paddingTop: padding.general }}>
          <CommonSubmitButton onPress={handleSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SendBody;
