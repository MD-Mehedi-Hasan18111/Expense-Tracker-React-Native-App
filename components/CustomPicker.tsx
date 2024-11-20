import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For dropdown icon

type Option = {
  label: string;
  value: string;
};

type CustomPickerProps = {
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

const CustomPicker: React.FC<CustomPickerProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.pickerText}>{selectedValue}</Text>
        <MaterialIcons name="arrow-drop-down" size={20} color="#9C27B0" />
      </TouchableOpacity>

      {/* Modal for dropdown */}
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item.label)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
    backgroundColor: "#fff",
    width: 120,
  },
  pickerText: {
    fontSize: 14,
    color: "#000",
    marginRight: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: 300,
    maxHeight: 400,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: "#8e44ad",
    marginVertical: 4,
    borderRadius: 10
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default CustomPicker;
