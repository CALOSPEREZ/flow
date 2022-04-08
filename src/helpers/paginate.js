const p = {}
p.getPagination = (page, size) => {
	const limit = size ? +size : 10
	const offset = page ? page * limit : 0
	return { limit, offset }
}
p.getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: categorias } = data
	const currentPage = page ? +page : 0
	const totalPages = Math.ceil(totalItems / limit)

	return { totalItems, categorias, totalPages, currentPage }
}
p.paginate = (query, { page, pageSize }) => {
	const offset = page * pageSize
	const limit = pageSize
	return {
		...query,
		offset,
		limit,
	}
}

module.exports = p