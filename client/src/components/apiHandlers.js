import axios from 'axios';
import { useDispatch } from 'react-redux';


// api options data
import TOKEN from '../../../config.js';
const url = 'https://cdn.projectcatwalk.us/api';
const auth = { headers: { Authorization: TOKEN.TOKEN } };



export default {
  addToCart: (dispatch, sku) => {
    let options = {
      method: 'POST',
      url: `${url}/cart`,
      headers: { Authorization: TOKEN.TOKEN },
      data: {['sku_id']: sku}
    };

    axios(options)
      .then((res) => {
        axios.get(`${url}/cart`, auth)
          .then((res) => {
            return dispatch({type: 'GET_CART', cart: res.data});
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};