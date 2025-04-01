import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import ConfirmModal from "@components/ConfirmModal";
import { loadProjects, saveProjects } from "@storage/storage";
import { Project } from "@customTypes/index";
import { RootStackParamList } from "@customTypes/index";
import Colors from "@constants/colors";
import Texts from "@constants/texts";
import { showNotification } from "@components/NotifierManager";

type ProjectListScreenProp = StackNavigationProp<
  RootStackParamList,
  "ProjectList"
>;

const ProjectList = () => {
  const navigation = useNavigation<ProjectListScreenProp>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  useEffect(() => {
    loadProjects()
      .then(setProjects)
      .catch(() => {
        showNotification(Texts.errorLoading, "error");
      });
  }, []);

  const updateProjects = async (updated: Project[], save: boolean = true) => {
    try {
      setProjects(updated);
      if (save) {
        await saveProjects(updated);
        showNotification(Texts.successSave, "success");
      }
    } catch (error) {
      showNotification(Texts.errorSave, "error");
    }
  };

  const addProject = async () => {
    Keyboard.dismiss();

    if (!name.trim()) {
      showNotification(Texts.errorProjectNameRequired, "error");
      return;
    }

    if (projects.some((project) => project.name === name.trim())) {
      showNotification(Texts.errorProjectNameDuplicate, "error");
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: name.trim(),
      tasks: [],
    };
    const updatedProjects = [...projects, newProject];
    await updateProjects(updatedProjects);
    setName("");
    showNotification(Texts.successAddProject, "success");
  };

  const confirmDeleteProject = (id: string) => {
    setSelectedProjectId(id);
    setModalVisible(true);
  };

  const deleteProject = async () => {
    if (!selectedProjectId) return;
    const updatedProjects = projects.filter((p) => p.id !== selectedProjectId);
    await updateProjects(updatedProjects);
    setModalVisible(false);
    setSelectedProjectId(null);
    showNotification(Texts.successDeleteProject, "success");
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Project>) => (
    <TouchableOpacity
      style={[styles.projectItem, isActive && styles.activeItem]}
      onPress={() => navigation.navigate("Tasks", { project: item })}
      onLongPress={drag}
    >
      <Text style={styles.projectName}>{item.name}</Text>
      <TouchableOpacity onPress={() => confirmDeleteProject(item.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{Texts.addProject}</Text>
      <TextInput
        style={styles.input}
        placeholder={Texts.newProjectPlaceholder}
        placeholderTextColor={Colors.grey}
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={addProject}>
        <Text style={styles.buttonText}>{Texts.addProject}</Text>
      </TouchableOpacity>

      <DraggableFlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={({ data }) => updateProjects(data, false)}
      />

      <ConfirmModal
        visible={modalVisible}
        message={Texts.confirmDeleteProject}
        onCancel={() => setModalVisible(false)}
        onConfirm={deleteProject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
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
  projectItem: {
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  activeItem: {
    backgroundColor: Colors.border,
  },
  projectName: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  delete: {
    color: Colors.danger,
    fontSize: 25,
  },
});

export default ProjectList;
