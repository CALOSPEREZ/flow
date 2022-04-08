export const handleError = (error, res) => {
    res.status(500).json({
      message: 'An error ocurred',
      error: error.toString()
    })
  }
  export const server = 'http://127.0.0.1:9110'