import axios from "axios";

let key = import.meta.env.VITE_API_KEY;
const instance = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/" + key + "/latest/",
});

export default function getExchangeRate(value = "USD") {
  return instance.get("/" + value);
}
