import { Card, CardContent, Grid, Typography } from "@mui/material";
//import axios from "axios";
//import React, { useEffect, useState } from "react";
//import useFetch from "../../hooks/useFetch";
import {
  useQuery,
} from '@tanstack/react-query'
import axios from "axios";
export default function Category() {
  //const [categories, setCategories] = useState([]);
  //const [loading, setLoading] = useState(false);

  // const {
  //   loading,
  //   error,
  //   data: categories = [], 
  // } = useFetch(`${import.meta.env.VITE_BURL}/categories`);

  const fetchCategories = async () => {
    const {data} = await axios.get(`${import.meta.env.VITE_BURL}/categories`);
    return data;
  }

  const {data, isError, isLoading, error} = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry:3,
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }


  //console.log("Categories:", categories);

  // const getCategories = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${import.meta.env.VITE_BURL}/categories`);
  //     //console.log("categories", res.data);

  //     if (res.status === 200) {
  //       setCategories(res.data);
  //     } else {
  //       console.error("Failed to fetch categories");
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <>
      <Grid container spacing={2}>
        {data.map((category) => (
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
