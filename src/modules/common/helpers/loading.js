function checkLoadingState(items) {
  return items.some((item) => item.isLoading);
}

export default checkLoadingState;
