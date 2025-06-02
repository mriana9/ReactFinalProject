import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BURL}/products`);
      //console.log("products", res.data);

      if (res.status === 200) {
        setProducts(res.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ xs: 12, md: 4, xl: 3 }} key={product.id}>
            <Card sx={{ minWidth: 275, mt: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={product.mainImg}
                title={product.name}
                component="img"
                alt={product.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`product/${product.id}`}>Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
