import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "@constants/colors";

type ConfirmModalProps = {
  visible: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

function ConfirmModal({
  visible,
  message,
  onCancel,
  onConfirm,
  confirmText = "Usuń",
  cancelText = "Anuluj",
}: ConfirmModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalCancel} onPress={onCancel}>
              <Text style={styles.modalButtonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalDelete} onPress={onConfirm}>
              <Text style={styles.modalButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    width: "80%",
    alignItems: "center",
    elevation: 5,
    borderWidth: 2,
    borderColor: Colors.textPrimary,
  },
  modalText: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancel: {
    flex: 1,
    marginRight: 5,
    backgroundColor: Colors.grey,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalDelete: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: Colors.danger,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: Colors.background,
    fontWeight: "bold",
  },
});

export default ConfirmModal;
