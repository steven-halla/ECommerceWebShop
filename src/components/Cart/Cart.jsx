import React from 'react'
import {Button, Container, Grid, Typography} from "@material-ui/core";
import useStyles from './styles';

export const Cart = ({cart}) => {
  const classes = useStyles();

  if (!cart) {
    return <>Loading Cart</>;
  }

  console.log(cart);

  const isEmpty = cart.line_items.length === 0;

  return (
    <div>
      <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant="h3">
          Your Shopping Cart
        </Typography>
        {isEmpty ? <EmptyCart/> : <FilledCart cart={cart} classes={classes}/>}
      </Container>
    </div>
  )
}

const EmptyCart = () => (
  <Typography variant="subtitle1">
    You have no items in your shopping cart, start adding some.
  </Typography>
);

const FilledCart = ({cart, classes}) => (
  <>
    <Grid container={3}>
      {cart.line_items.map((item) => (
        <Grid item xs={12} sm={4} key={item.id}>
          <div>
            {item.name}
          </div>
        </Grid>
      ))}
    </Grid>
    <div className={classes.cardDetails}>
      <Typography variant="h4">
        Subtotal: {cart.subtotal.formatted_width_symbol}
      </Typography>
      <div>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">
          Empty Cart
        </Button>
        <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">
          Checkout
        </Button>
      </div>
    </div>
  </>
)
