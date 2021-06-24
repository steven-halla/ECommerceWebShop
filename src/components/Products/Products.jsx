import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';


const products = [
  {id:1, name: 'Shoes', description: 'Running shoes.', price: '$5', image: 'https://i.insider.com/5e38419b5bc79c4c7d4e1192?width=906&format=jpeg'},
  {id:2, name: 'Macbook', description: 'Apple macbook.', price: '$10', image: 'https://www.macworld.co.uk/cmsdata/features/3685961/macbook_air_2019_review_9_thumb800.jpg'},
];

const Products = () => {
  const classes = useStyles();

  return(

    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;