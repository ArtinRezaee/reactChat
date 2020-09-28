import { Button } from "@material-ui/core";
import React from "react";

type SignInProps = {
  hasUser: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
};

export const SignIn: React.FC<SignInProps> = ({
  hasUser = false,
  onSignIn,
  onSignOut,
}: SignInProps) => {
  return !hasUser ? (
    <Button
      variant="contained"
      color="primary"
      onClick={onSignIn}
      className="sign-in"
    >
      Sign in with Google
    </Button>
  ) : (
    <Button variant="contained" onClick={onSignOut} className="sign-out">
      Sign out
    </Button>
  );
};

export default SignIn;
