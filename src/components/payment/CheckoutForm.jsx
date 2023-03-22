import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
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
          defaultValue={"Car Driving"}
          disabled
        />
      </label>
      <label className="flex flex-col justify-center gap-y-2 my-4">
        Customer Name:
        <input
          type="text"
          className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
          defaultValue={"Tanvin Ahmed"}
          disabled
        />
      </label>
      <label className="flex flex-col justify-center gap-y-2 my-4">
        Customer Address:
        <textarea
          defaultValue={"Address"}
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
          disabled={!stripe}
        >
          Pay {"200"}$
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
