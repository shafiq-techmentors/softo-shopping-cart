import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { cartTypes } from "../../types";
import { Button, Typography } from "@mui/material";

type Props = {
  cartItems: cartTypes[];
  addToCart: (clickedItem: cartTypes) => void;
  removeFromCart: (id: number) => void;
};
export const CartItem = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: cartTypes[]) =>
    items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ minWidth: 350 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.colour}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </Button>

                  <Typography>{item.quantity}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </Button>
                </Stack>
              </TableCell>
              <TableCell align="right">{item.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">
              ${calculateTotal(cartItems).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Delivery Charges</TableCell>
            <TableCell align="right">$0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="h6" component="div">
                {" "}
                Total
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="div">
                {calculateTotal(cartItems).toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
