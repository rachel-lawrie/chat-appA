// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// establish Firestore connection
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAZ-EXNLDC4oXnOTBHi29-vE7pymPTlNsY",
    authDomain: "chat-app-dab64.firebaseapp.com",
    projectId: "chat-app-dab64",
    storageBucket: "chat-app-dab64.appspot.com",
    messagingSenderId: "144081938048",
    appId: "1:144081938048:web:101536c1e29e3ed03a2865",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {/* Pass the database connection to the Chat component, note new way to pass props */}
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Now there are two app consts so will need to address that

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
