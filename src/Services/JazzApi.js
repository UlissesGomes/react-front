import axios from "axios";

export const URL = "http://192.168.15.6:8080";

class JazzApi {
  openCashier = () => axios.post(`${URL}/cashier/open`);
  closeCashier = () => axios.post(`${URL}/cashier/close`);
  getOrders = () => axios.get(`${URL}/cashier/orders/false`);
  closeOrder = numberOrder => axios.put(`${URL}/cashier/order/${numberOrder}`);
  revertOrder = numberOrder => axios.put(`${URL}/cashier/order/${numberOrder}`);
  getAssociate = () => axios.get(`${URL}/associate`);
  removeAssociate = id => axios.delete(`${URL}/associate/${id}`);
  makeAvailable = id => axios.put(`${URL}/itens/${id}`);
  checkCashier = () => axios.get(`${URL}/cashier/exists`);
  getMenuItens = () => axios.get(`${URL}/itens`);
  removeMenuItem = id => axios.delete(`${URL}/itens/${id}`);
  createMenuItem = item => axios.post(`${URL}/itens`, item);
  updateMenuItem = item => axios.put(`${URL}/itens/${item._id}`, item);
  getOrdersByValueTrue = () => axios.get(`${URL}/cashier/orders/true`);
  getTotal = () => axios.get(`${URL}/cashier/order/total`);
}

export default new JazzApi();
