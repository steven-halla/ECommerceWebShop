import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: '100%'
  },
  cardContent: {
    cursor: "pointer"
  },
  media: {
    // height: 0,
    paddingTop: '56.25%', //16:9
  },
  productMainText: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
