import { useState } from "react";
import {
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF"); // Initial background color
  const [selectedColor, setSelectedColor] = useState(""); // Track state of selected to apply styling to selected color

  const handleColorChange = (color) => {
    setBackgroundColor(color);
    setSelectedColor(color);
  };

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        if (result.user && result.user.uid) {
          navigation.navigate("Chat", {
            name: name,
            backgroundColor: backgroundColor,
            userID: result.user.uid,
          });
        } else {
          Alert.alert("Unable to enter chat due to authentication failure.");
        }
      })
      .catch((error) => {
        Alert.alert("Unable to enter chat due to an error.");
      });
  };

  // First screen to enter name and go to second screen
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/background-image.png")}
        >
          <Text style={styles.appTitle}>Chat App</Text>

          <View style={styles.startSelection}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />

            <View style={styles.backgroundColorContainer}>
              <Text style={styles.textBackground}>
                Choose Background Color:
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.colorButton,
                    { backgroundColor: "#090C08" },
                    selectedColor === "#090C08" && styles.selectedColorButton,
                  ]}
                  onPress={() => handleColorChange("#090C08")}
                />
                <TouchableOpacity
                  style={[
                    styles.colorButton,
                    { backgroundColor: "#474056" },
                    selectedColor === "#474056" && styles.selectedColorButton,
                  ]}
                  onPress={() => handleColorChange("#474056")}
                />
                <TouchableOpacity
                  style={[
                    styles.colorButton,
                    { backgroundColor: "#8A95A5" },
                    selectedColor === "#8A95A5" && styles.selectedColorButton,
                  ]}
                  onPress={() => handleColorChange("#8A95A5")}
                />
                <TouchableOpacity
                  style={[
                    styles.colorButton,
                    { backgroundColor: "#B9C6AE" },
                    selectedColor === "#B9C6AE" && styles.selectedColorButton,
                  ]}
                  onPress={() => handleColorChange("#B9C6AE")}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.startChattingButton}
              onPress={signInUser}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Start Chatting
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  appTitle: {
    fontSize: 45,
    fontWeight: 600,
    color: "#FFFFFF",
    marginBottom: 200, // Adjust spacing as needed
  },
  startSelection: {
    backgroundColor: "#FFFFFF",
    width: "88%",
    height: "44%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
    // alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    opacity: 50,
    width: "88%",
    padding: 15,
    borderColor: "#757083",
    borderWidth: 1,
    alignSelf: "center",
  },
  backgroundColorContainer: {
    width: "88%",
    alignSelf: "center",
  },
  textBackground: {
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    opacity: 100,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
  },

  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of width and height to make it circular
    margin: 5,
  },
  selectedColorButton: {
    borderWidth: 2, // Example: Add a border to indicate selection
    borderColor: "#090C08", // Example: Change border color
  },
  startChattingButton: {
    backgroundColor: "#757083",
    width: "88%",
    padding: 15,
    alignSelf: "center",
  },
});

export default Start;
