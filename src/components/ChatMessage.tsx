import firebase from "firebase";
import React from "react";
import { useFireAuth } from "./hooks";
import { firebaseMessage } from "./hooks/useMessages";

type ChatMessageProps = {
  message: firebaseMessage;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
}: ChatMessageProps) => {
  const { text, uid, photoUrl } = message;
  const currentUser = useFireAuth(firebase.auth());

  const messageClass =
    uid === currentUser.currentUser?.uid ? "sent" : "received";
  return (
    <div className={`${messageClass}`}>
      <img src={photoUrl} />
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
