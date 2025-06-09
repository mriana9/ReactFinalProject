import { Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BURL}/categories`);
      //console.log("categories", res.data);

      if (res.status === 200) {
        setCategories(res.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid size={{ xs: 12, md: 4, xl: 3 }} key={category.id}>
            <Card sx={{ minWidth: 275, mt: 2 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
