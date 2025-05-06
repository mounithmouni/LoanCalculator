import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://v6.exchangerate-api.com/v6/c6a1f078b28f498f7e7342c4/latest/",
});

export default function getExchangeRate(value = "USD") {
  return instance.get("/" + value);
}
