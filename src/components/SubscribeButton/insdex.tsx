import { signIn, useSession } from "next-auth/client";

//@libraries
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

//@styles
import styles from "./styles.module.scss";

type SubscribeButtonProps = {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  function handleSubscribe() {
    if (!session) {
      toast("Ops! É necesssário logar para assinar.", {
        style: {
          backgroundColor: "#29292e",
          color: "#fff",
        },
      });

      setTimeout(() => {
        signIn("Github");
      }, 1000);
      return;
    } else {

      

    }
  }

  return (
    <>
      <ToastContainer />
      <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
      >
        Subscribe now
      </button>
    </>
  );
}
