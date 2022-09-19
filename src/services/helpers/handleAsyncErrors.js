const handleAsyncFunction = (asyncFunction, ...functionParams) => {
  try {
    return asyncFunction(...functionParams);
  } catch (error) {
    alert('Error', error);
  }
};

export default handleAsyncFunction;
