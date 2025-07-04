import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//import { toast, Slide } from "react-toastify";
//import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import { Circle, LocalDining } from "@mui/icons-material";

export default function Product() {
  const { id } = useParams("id");
  //console.log("Product ID:", id);
  const queryClient = new QueryClient();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  //const { cartItems, setCartItems } = useContext(CartContext);

  const getProductId = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BURL}/products/${id}`
      );
      //console.log("product id", res.data);

      if (res.status === 200) {
        setProduct(res.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };
  // const addToCard = async (productId) => {
  //   //console.log("Add to cart clicked for product ID:", productId);
  //   const userToken = localStorage.getItem("userToken");

  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BURL}/Carts/${productId}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       setLoading(true);
  //       toast.success("Add to Cart Successfully", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         transition: Slide,
  //       });

  //       setCartItems(cartItems + 1);
  //     } else {
  //       toast.error("Please Check Your Network and Try Again!", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         transition: Slide,
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Please Check Your Network and Try Again!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       transition: Slide,
  //     });
  //     console.error("Add to cart error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

 // const addToCard = async () => {};

  const addToCardMutation = useMutation({
    mutationFn: (productId) => {
      return axiosAuth.post(`${import.meta.env.VITE_BURL}/Carts/${productId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartItems"],
      });
    },
    onError: (error) => {
      console.error("Add to cart error:", error.message);
    },
  });

  useEffect(() => {
    getProductId();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.mainImg}
          title={product.name}
          component="img"
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            {product.title}
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            {product.price} $
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton

            onClick={() => {
              addToCardMutation.mutate(product.id);
            }}
            aria-label="share"
            disabled={addToCardMutation.isLoading}
          >
            {addToCardMutation.isPending ? <Circle /> :  <ShoppingCartIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
