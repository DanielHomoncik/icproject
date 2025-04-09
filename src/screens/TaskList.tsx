import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import TaskItem from "@screens/TaskItem";
import useTasksManager from "@hooks/useTasksManager";
import ConfirmModal from "@components/ConfirmModal";
import { Project, Task } from "@customTypes/index";
import Colors from "@constants/colors";
import Texts from "@constants/texts";
import { showNotification } from "@components/NotifierManager";

const TaskList = ({ route }: any) => {
  const { project } = route.params as { project: Project };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const { tasks, toggleTask, updateTaskOrder, addTask, removeTask, setTasks } =
    useTasksManager(project);

  const confirmDeleteTask = (id: string) => {
    setSelectedTaskId(id);
    setModalVisible(true);
  };

  const handleDeleteTask = () => {
    if (selectedTaskId) {
      removeTask(selectedTaskId);
      setModalVisible(false);
      setSelectedTaskId(null);
      showNotification(Texts.successDeleteTask, "success");
    }
  };

  const handleAddTask = () => {
    Keyboard.dismiss();

    if (!newTaskTitle.trim()) {
      showNotification(Texts.errorTaskNameRequired, "error");
      return;
    }

    const isAdded = addTask(newTaskTitle);

    if (isAdded) {
      setNewTaskTitle("");
      showNotification(Texts.successAddTask, "success");
    }
  };
  // const lastTask = () => {
  //   console.log(tasks.length);
  // };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Task>) => (
    <TaskItem
      task={item}
      onRemove={confirmDeleteTask}
      onToggle={toggleTask}
      onLongPress={drag}
      isActive={isActive}
      isOnlyTask={tasks.length === 1}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{Texts.tasks}</Text>
      <TextInput
        style={styles.input}
        placeholder={Texts.newTaskPlaceholder}
        placeholderTextColor={Colors.grey}
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>{Texts.addTask}</Text>
      </TouchableOpacity>

      <DraggableFlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={({ data }) => updateTaskOrder(data)}
      />

      <ConfirmModal
        visible={modalVisible}
        message={Texts.confirmDeleteTask}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleDeleteTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskList;
