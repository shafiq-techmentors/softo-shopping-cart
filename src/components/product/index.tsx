import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { cartTypes } from "../../types";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type Props = {
  item: cartTypes;
  handleAddToCart: (clickedItem: cartTypes) => void;
};
export const Product = ({ item, handleAddToCart }: Props) => (
  <Paper
    sx={{
      p: 2,
      margin: "auto",
      maxWidth: 800,
      flexGrow: 1,
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    }}
  >
    <Grid container spacing={2}>
      <Grid item>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <Img alt="complex" src={item.img} />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="body1" component="div">
              ${item.name}
            </Typography>

            <Typography color="secondary" variant="body1">
              Color: {item.colour}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant={"contained"}
              color="info"
              size="large"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" color="secondary" component="div">
            ${item.price}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);
