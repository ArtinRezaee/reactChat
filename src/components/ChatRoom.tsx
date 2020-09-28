import { Button, makeStyles, TextField } from "@material-ui/core";
import "firebase/firestore";
import React, { useCallback, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useMessages } from "./hooks";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    position: "sticky",
    bottom: 0,
  },
  textField: {
    width: "85%",
    height: "100%",
  },
  submitButton: {
    width: "15%",
  },
  input: {
    lineHeight: "1.5",
    color: "white",
    outline: "none",
    border: "none",
    background: "rgb(58, 58, 58)",
    height: "100%",
  },
}));

export const ChatRoom: React.FC = () => {
  const classes = useStyles();
  const {
    messages,
    onChangeFormValue,
    submitMessage,
    currentFormValue,
  } = useMessages();
  const dummy = useRef<HTMLDivElement>(null);

  const onSubmitMesage = useCallback(() => {
    submitMessage();
    dummy?.current?.scrollIntoView({ behavior: "smooth" });
  }, [submitMessage]);
  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>

      <div className={classes.inputContainer}>
        <TextField
          id="message-input"
          variant="outlined"
          onChange={onChangeFormValue}
          value={currentFormValue}
          className={classes.textField}
          inputProps={{ className: classes.input }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmitMesage}
          className={classes.submitButton}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default ChatRoom;
