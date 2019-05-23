import axios from "axios";

const URL = "http://localhost:3003/api";

class JazzApi {
  getOrders = () => axios.get(`${URL}/orders`);
  getAssociate = () => axios.get(`${URL}/associate`);
  removeAssociate = id => axios.delete(`${URL}/associate/${id}`);
}

export default new JazzApi();
