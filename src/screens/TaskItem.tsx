import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "@customTypes/index";
import Colors from "@constants/colors";

type Props = {
  task: Task;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onLongPress: () => void;
  isActive: boolean;
};

export default function TaskItem({
  task,
  onRemove,
  onToggle,
  onLongPress,
  isActive,
}: Props) {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      style={[
        styles.taskItem,
        { backgroundColor: isActive ? Colors.border : Colors.background },
      ]}
    >
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <Text style={styles.checkbox}>{task.completed ? "✅" : "⬜️"}</Text>
      </TouchableOpacity>
      <Text style={[styles.title, task.completed && styles.completed]}>
        {task.title}
      </Text>
      <TouchableOpacity onPress={() => onRemove(task.id)}>
        <Text style={styles.remove}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  checkbox: {
    marginRight: 10,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  completed: {
    textDecorationLine: "line-through",
    color: Colors.grey,
  },
  remove: {
    fontSize: 25,
    marginLeft: 10,
    color: Colors.danger,
  },
});
