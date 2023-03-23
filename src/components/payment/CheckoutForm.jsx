import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createOrder } from "../../apis/order";
import { generatePaymentClientSecret } from "../../apis/paymentAPI";
import { userInfoContext } from "../../context/UserInfo";
import { packages } from "../../utils/data";
import Alert from "../shared/Alert";
import Loader from "../shared/Loader";

const CheckoutForm = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const { userInfo } = useContext(userInfoContext);
  const [item, setItem] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setItem(packages.find((p) => p?._id === id));
  }, [id]);

  useEffect(() => {
    if (!item?.price) return;

    const getClientSecret = async () => {
      const { clientSecret, errorMessage } = await generatePaymentClientSecret(
        item?.price
      );

      !errorMessage && setClientSecret(clientSecret);
    };

    getClientSecret();
  }, [item]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setLoading(true);

    setPaymentError(null);
    setPaymentSuccess(null);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setLoading(false);
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setLoading(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userInfo?.fullName,
            email: userInfo?.email,
          },
        },
      });

    if (error || confirmError) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
      setLoading(false);
    } else {
      setPaymentError(null);

      const newOrder = {
        userId: userInfo?._id,
        paymentId: paymentMethod?.id,
        packageId: id,
        price: item?.price,
      };

      // post server
      const { errorMessage } = await createOrder(newOrder);
      if (errorMessage) {
        setPaymentError(errorMessage);
        setLoading(false);
      } else {
        setPaymentSuccess(paymentMethod.id);
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-purple-700 rounded sm:w-1/2 w-full p-4"
    >
      <h1 className="text-[30px] text-center">Checkout form</h1>
      <label className="flex flex-col justify-center gap-y-2 my-4">
        Service Name:
        <input
          type="text"
          className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
          defaultValue={item?.name}
          disabled
        />
      </label>
      <label className="flex flex-col justify-center gap-y-2 my-4">
        Customer Name:
        <input
          type="text"
          className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
          defaultValue={userInfo?.fullName}
          disabled
        />
      </label>
      <label className="flex flex-col justify-center gap-y-2 my-4">
        Email:
        <input
          type="text"
          className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
          defaultValue={userInfo?.email}
          disabled
        />
      </label>
      <label className="flex flex-col justify-center gap-y-2 my-4">
        Phone number:
        <input
          type="text"
          className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
          defaultValue={userInfo?.phone}
          disabled
        />
      </label>
      <label className="flex flex-col justify-center gap-y-2 my-4">
        Customer Address:
        <textarea
          defaultValue={userInfo?.address}
          rows={2}
          cols={2}
          name="address"
          className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
          disabled
        />
      </label>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
              backgroundColor: "#1C1625",
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex mt-6 justify-center items-center">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          disabled={!stripe || loading}
        >
          Pay {item?.price}$
        </button>
      </div>
      {loading && (
        <div className="my-4">
          <Loader />
        </div>
      )}
      {paymentError && (
        <div className="my-4">
          <Alert variant={"danger"} message={"payment not successful!"} />
        </div>
      )}
      {paymentSuccess && (
        <div className="my-4">
          <Alert variant={"success"} message={"payment completed!"} />
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
