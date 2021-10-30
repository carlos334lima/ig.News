import { GetStaticProps } from "next";
import Head from "next/head";

//@components
import { SubscribeButton } from "../components/SubscribeButton/insdex";

//@utils
import { stripe } from "../services/stripe";

//@styles
import styles from "./home.module.scss";

type homeProps = {
  product: {
    priceId: string;
    amount: number;
  };
};

export default function Home({ product }: homeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, Welcome</span>

          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publication <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1Jq4qNFpcm4LwVocTl2QCEU2");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 // 24hrs
  };
};
