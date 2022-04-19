export const config = {
  apiKey: "1FA65AD3-B303-42A2-972F-42E2L6EE6EC0",
  secretKey: "34c785b13d4499ef294ab86e7bc829da1d95fdc1",
  apiURL: "https://flow.cl/api",
  baseURL: "http://flowosccomerce.tuxpan.com/csepulveda/api2/pay",
  result: "/result",
  payment_confirm: "/payment_confirm",
  metod: "payment/create",
  restaurantes: {
    // basico: 48000,
    // intermedio: 60000,
    // avanzado: 90000,
    intermedio: 200,
    basico: 100,
    avanzado: 300,
  },
  agencia: {
    basico: 15.0,
  },
  museo: {
    basico: 8.0,
  },
  salud: {
    basico: 30.0,
  },
  adicional: {
    basico: 30.0,
  },
  ds: {
    basico: 100,
    avanzado: 134000,
  },
  flow: "https://www.flow.cl/api/payment/create",
};
