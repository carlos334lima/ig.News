import { signIn, useSession } from "next-auth/client";

//@libraries
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

//@styles
import styles from "./styles.module.scss";
import { stripe } from "../../services/stripe";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

type SubscribeButtonProps = {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  const handleSubscribe = async () => {
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
      try {
        const response = await api.post("/subscribe");

        const { sessionId } = response.data;

        const stripe = await getStripeJs();

        await stripe.redirectToCheckout({ sessionId: sessionId });
      } catch (error) {
        toast("Ops! houve um error interno.", {
          style: {
            backgroundColor: "#29292e",
            color: "#fff",
          },
        });
        alert(error.message);
      }
    }
  };

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
