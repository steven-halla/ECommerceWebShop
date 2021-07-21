import React, {useState} from 'react'
import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import {AddShoppingCart} from "@material-ui/icons";
import Modal from 'react-modal';
import useStyles from './styles';

const CardWrapper = ({product, onAddToCart, onClick}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} onClick={onClick}>
      <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
      <CardContent className={classes.cardContent}>
        <div className={classes.productMainText}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
          {/*<Typography variant="h5">*/}
          {/*  {product.totalPrice}*/}
          {/*</Typography>*/}
        </div>
        <Typography dangerouslySetInnerHTML={{__html: product.description}} color="textSecondary"/>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product.id, 1)
        }}>
          <AddShoppingCart/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export const Product = ({product, onAddToCart}) => {

  const modalStyles = {
    overlay: {
      backgroundColor: '#99999966',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '70%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      backgroundColor: 'transparent',
    },
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>
      <CardWrapper product={product} onAddToCart={onAddToCart} onClick={openModal}/>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel={product.name}
      >
        <CardWrapper product={product} onAddToCart={onAddToCart} onClick={closeModal}/>
      </Modal>
    </>
  )
}