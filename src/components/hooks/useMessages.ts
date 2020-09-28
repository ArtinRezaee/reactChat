import { useFireAuth } from "./useAuth";
import { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CREATEDAT, MESSAGES } from "../Constants";

export type firebaseMessage = {
  id: string;
  text: string;
  uid: string;
  createdAt: string;
  photoUrl?: string;
};

type useMessageResult = {
  messages: firebaseMessage[];
  onChangeFormValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitMessage: () => Promise<void>;
  currentFormValue: string;
};

export const useMessages = (): useMessageResult => {
  const [formValue, setFormValue] = useState("");
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection(MESSAGES);
  const query = messagesRef.orderBy(CREATEDAT);
  const [messages] = useCollectionData(query, { idField: "id" });
  const { currentUser } = useFireAuth(firebase.auth());

  const onChangeFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = typeof e === "string" ? e : e.target.value;
    setFormValue(value);
  };

  const submitMessage = async () => {
    const uid = currentUser?.uid;
    const photoUrl = currentUser?.photoURL;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoUrl,
    });

    setFormValue("");
  };

  return {
    messages: messages as firebaseMessage[],
    onChangeFormValue: onChangeFormValue,
    submitMessage: submitMessage,
    currentFormValue: formValue,
  };
};

export default useMessages;
