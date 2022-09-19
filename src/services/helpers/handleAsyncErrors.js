const handleAsyncFunction = (asyncFunction, ...functionParams) => {
  try {
    return asyncFunction(...functionParams);
  } catch (error) {
    console.log('Error', error);
  }
};

export default handleAsyncFunction;
