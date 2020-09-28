import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { FIREBASE_CONFIG } from "./firebase.config";
import { ChatRoom, SignIn } from "./components";
import { useFireAuth } from "./components/hooks";

firebase.initializeApp(FIREBASE_CONFIG);

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  const { signIn, signOut } = useFireAuth(auth);
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    setHasUser(Boolean(auth.currentUser));
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <section>
        {user ? (
          <ChatRoom />
        ) : (
          <SignIn hasUser={hasUser} onSignIn={signIn} onSignOut={signOut} />
        )}
      </section>
    </div>
  );
}

export default App;
