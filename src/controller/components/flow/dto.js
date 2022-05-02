export const findInstalacionResource = (resource) => ({
  info: {
    resource,
  },
});
export const reporteResource = (resource) => ({
  flowOrder: resource.flowOrder,
  comercenum: resource.comercenum,
  nombre_cliente: resource.nombre_cliente,
  plan: resource.plan,
  tipo_plan: resource.tipo_plan,
  design: resource.design,
  tipo_design: resource.tipo_design,
  monto_design: resource.monto_design,
  monto_plan: resource.monto_plan,
  email: resource.email,
  currency: resource.currency,
  media: resource.media,
  amount: resource.amount,
  payment_date: resource.payment_date,
  payment_amount: resource.payment_amount,
});
