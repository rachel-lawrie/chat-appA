import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, userID } = route.params || {
    backgroundColor: "#FFFFFF",
  };
  const [messages, setMessages] = useState([]);

  // will make call to database and then update messages with the messages from the data base with setMessages, this will be an async function,
  // then call that function inside useEffect (actually, if using onSnapshot, then can put that directly in useEffect, will need to pass
  // uid:userID)

  // will make another const = async function to add messages to database, when updated, call setMessages so the chat updates w/ the newly added message

  // potential new code
  useEffect(() => {
    navigation.setOptions({ title: name });
    const unsubMessages = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          const messageData = doc.data();
          const createdAtTimestamp = messageData.createdAt;
          const createdAt = createdAtTimestamp.toDate(); // Convert Firestore Timestamp to Date
          newMessages.push({ id: doc.id, ...messageData, createdAt });
        });
        setMessages(newMessages);
      }
    );

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

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
