import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params || {
    backgroundColor: "#FFFFFF",
  };

  // updates title with name user entered in first screen
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Second screen that shows the name entered in the first screen
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text>Hello Screen2!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
