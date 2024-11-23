import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCurrency = async () => {
  const currency = await AsyncStorage.getItem("currency");
  return currency
};
