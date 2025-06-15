import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [loading, setLoading] = useState(false);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentSubmit = async () => {
    const userToken = localStorage.getItem("userToken");
    // console.log("User Token:", userToken);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BURL}/CheckOuts/Pay`,
        { PaymentMethod: paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (res.status === 200) {
        // toast.success("Checkout Successfully", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        //   transition: Slide,
        // });
        if (paymentMethod === "Visa") {
            window.location.href = res.data.url; // Redirect to payment gateway
        }
      } else {
        console.error("Failed to checkout");
      }
    } catch (error) {
      toast.error("Please Check Your Network and Try Again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="checkout-container">
        <h1>Checkout Page</h1>
        <p>Here you can review your order and proceed to payment.</p>
        <FormControl>
          <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
            <FormControlLabel
              control={<Radio />}
              label="visa"
              value="Visa"
            ></FormControlLabel>
            <FormControlLabel
              control={<Radio />}
              label="cash on Delivery"
              value="Cash"
            ></FormControlLabel>
          </RadioGroup>
        </FormControl>
        <Button fullWidth variant="contained" onClick={handlePaymentSubmit}>
          {loading ? "Loading..." : "Confirm Payment"}
        </Button>
      </div>
    </>
  );
}
