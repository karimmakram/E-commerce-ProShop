export const HandelError = (dispatch, type, error) => {
  dispatch({
    type,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
  })
}
