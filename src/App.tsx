import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Copyright } from "./components/layout/copyright";
import { Header } from "./components/layout/header";
import { cartTypes } from "./types";
import { Product } from "./components/product";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import _ from "lodash";

const getProducts = async (): Promise<cartTypes[]> =>
  await (
    await fetch(
      "https://my-json-server.typicode.com/benirvingplt/products/products"
    )
  ).json();

export default function App() {
  const [colour, setColour] = React.useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as cartTypes[]);
  const { data, isLoading, error } = useQuery<cartTypes[]>(
    "products",
    getProducts
  );
  useEffect(() => {
    setFilteredProducts(data);
  }, [data]);

  const [filteredProducts, setFilteredProducts] = React.useState<any>();
  console.log("filtered prod...", filteredProducts);

  let uniqueColours = _.uniqBy(data, "colour"); //removed if had duplicate id

  const getTotalItems = (items: cartTypes[]) =>
    items.reduce((total: number, item) => total + item.quantity, 0);

  const handleAddToCart = (clickedItem: cartTypes) => {
    setCartItems((prev) => {
      //check if the item is already added in the cart
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      //When first item is added to the
      return [...prev, { ...clickedItem, quantity: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return acc;
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as cartTypes[])
    );
  };
  const handleDrawer = () => {
    setCartOpen(!cartOpen);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const filtered: any = data?.filter(
      (item) => item.colour === event.target.value
    );
    setColour(event.target.value as string);
    setFilteredProducts([...filtered]);
  };
  return (
    <>
      <Header
        open={cartOpen}
        toggleDrawer={handleDrawer}
        badgeContent={getTotalItems(cartItems)}
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
      {isLoading && <LinearProgress />}
      {error ? (
        <Typography variant="h4" color="error" align="center" component="div">
          Something went wrong ...
        </Typography>
      ) : (
        <>
          <Container
            disableGutters
            maxWidth="md"
            component="main"
            sx={{ pt: 8, pb: 6 }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="secondary"
              gutterBottom
            >
              Free Delivery
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              component="p"
            >
              Softoo is an online shopping cart System which provides free
              delivery across the country. Choose any product and add to cart to
              get{" "}
              <span style={{ color: "#3f3f56", fontWeight: "900" }}>
                free delivery.
              </span>
            </Typography>
          </Container>
          {/* End hero unit */}
          <Container maxWidth="lg" component="main">
            <Grid container spacing={5}>
              <Grid item xs={2}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={colour}
                      label="Color"
                      onChange={handleChange}
                    >
                      {uniqueColours?.map((item) => (
                        <MenuItem key={item.id} value={item.colour}>
                          {item.colour}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              {filteredProducts?.map((item: cartTypes) => (
                <Grid item key={item.id} xs={12} md={12} lg={12}>
                  <Product item={item} handleAddToCart={handleAddToCart} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
      <Copyright />
    </>
  );
}
