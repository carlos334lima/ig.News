//@libraries
import { FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/client";

//@styles
import styles from "./styles.module.scss";

export function SignInButton() {
  const [session] = useSession();

  console.log("@SESSION", session);

  return session ? (
    <button
      type="submit"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="submit"
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
