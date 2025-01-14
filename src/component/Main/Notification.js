import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

function CustomCheckbox({ checkPress, isChecked }) {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={checkPress}>
      {isChecked && (
        <View style={styles.check}>
          <Icon name="check" color="#fff" size={14}></Icon>
        </View>
      )}
    </TouchableOpacity>
  );
}

function timeset(startTime, endTime) {
  const [startHour, startMin] = startTime;
  const [endHour, endMin] = endTime;

  const formatTime = (hour) => {
    const period = hour < 12 || hour === 24 ? "오전" : "오후";
    let formattedHour = hour % 12;
    if (formattedHour === 0) formattedHour = 12;
    return `${period} ${formattedHour}시`;
  };

  const start = `${formatTime(startHour)} ${startMin}분`;
  const end = `${formatTime(endHour)} ${endMin}분`;

  return `${start} - ${end}`;
}

function Notification({
  id,
  content,
  startTime,
  endTime,
  isTouched,
  isChecked,
  handlePress,
  checkPress,
  openRowKey,
}) {
  const isOpen = openRowKey == id;

  return (
    <TouchableOpacity
      style={[
        isTouched && isOpen
          ? styles.openTouchedNotification
          : isTouched
          ? styles.touchedNotification
          : isOpen
          ? styles.openNotification
          : styles.notification,
      ]}
      onPress={handlePress}
      activeOpacity={1}
    >
      <View style={styles.custom}>
        <CustomCheckbox
          isChecked={isChecked}
          checkPress={checkPress}
        ></CustomCheckbox>
      </View>
      <View>
        <Text style={isChecked ? styles.checkedNotiText : styles.notiText}>
          {content}
        </Text>
        <Text style={isChecked ? styles.checkedtimeText : styles.timeText}>
          {timeset(startTime, endTime)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  notification: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 7,
    width: 272,
    borderRadius: 32,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 8.5,
  },
  touchedNotification: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 7,
    width: 272,
    borderRadius: 32,
    borderColor: "#6E3BFF",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 8.5,
  },
  openNotification: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 7,
    width: 245,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 8.5,
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
  },
  openTouchedNotification: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 7,
    width: 245,
    borderColor: "#6E3BFF",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 8.5,
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 50,
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    backgroundColor: "#6E3BFF",
    width: 24,
    height: 24,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  custom: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 12,
  },
  notiText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  checkedNotiText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#aaa",
    marginBottom: 2,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  timeText: {
    fontSize: 10,
  },
  checkedtimeText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "#aaa",
    fontSize: 10,
  },
});

export default Notification;
