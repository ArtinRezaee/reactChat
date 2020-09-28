import firebase from "firebase";

type useAuthResults = {
  signIn: () => void;
  signOut: () => void;
  currentUser: firebase.User | null;
};

export const useFireAuth = (auth: firebase.auth.Auth): useAuthResults => {
  const singInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  const currentUser = auth.currentUser;

  return {
    signIn: singInWithGoogle,
    signOut: signOut,
    currentUser: currentUser,
  };
};

export default useFireAuth;
