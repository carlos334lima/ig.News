//@libraries
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

//@styles
import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLogged = false;

  return isUserLogged ? (
    <button type="submit" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      Carlos Lima
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="submit" className={styles.signInButton}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
