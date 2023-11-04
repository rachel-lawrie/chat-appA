import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ db, isConnected, navigation, route }) => {
  const { name, backgroundColor, userID } = route.params || {
    backgroundColor: "#FFFFFF",
  };
  const [messages, setMessages] = useState([]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("local_messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, async (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          const messageData = doc.data();
          const createdAtTimestamp = messageData.createdAt;
          const createdAt = createdAtTimestamp.toDate(); // Convert Firestore Timestamp to Date
          newMessages.push({ id: doc.id, ...messageData, createdAt });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("local_messages", JSON.stringify(newMessages));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    // Add the new message to the database
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // customizes the chat bubble colors
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  // Don't show the input bar if no connection
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // Second screen that shows the name entered in the first screen
  return (
    // <View style={[styles.container, { backgroundColor: backgroundColor }]}>
    <View style={{ flex: 1, backgroundColor }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        // do I need to make this newMessages?
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
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
});

export default Chat;
