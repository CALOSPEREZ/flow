export const sintomaResource = (resource) => ({
  id: resource.id,
  descripcion: resource.descripcion,
  idioma: resource && resource.idioma
})

export const sintomaResourceAlternative = (resource) => ({
  id: resource.id,
  descripcion: resource.descripcion,
  idioma: resource && resource.idioma

})
export const sintomaDeleteResource = (resource) => ({
  recurso_eliminado: resource
})
export const sintomasResource = (resources) =>
  resources.map((resource) => sintomaResource(resource))
