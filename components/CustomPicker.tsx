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
import { useTheme } from "../hooks/useTheme";

type Option = {
  label: string;
  value: string;
};

type CustomPickerProps = {
  options: Option[];
  selectedValue: {
    label: string;
    value: string;
  };
  onValueChange: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
    }>
  >;
};

const CustomPicker: React.FC<CustomPickerProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const { primaryColor } = useTheme();

  const handleSelect = (option: { label: string; value: string }) => {
    onValueChange(option);
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.pickerContainer, { borderColor: primaryColor }]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.pickerText}>{selectedValue.label}</Text>
        <MaterialIcons name="arrow-drop-down" size={20} color={primaryColor} />
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
            <Text style={{ fontSize: 16, color: "#000", marginBottom: 10 }}>
              Select category:
            </Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    { backgroundColor: primaryColor },
                  ]}
                  onPress={() => handleSelect(item)}
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
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
    backgroundColor: "#fff",
    width: "auto",
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
    maxHeight: 600,
  },
  dropdownItem: {
    padding: 10,
    // backgroundColor: "#8e44ad",
    marginVertical: 4,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default CustomPicker;
