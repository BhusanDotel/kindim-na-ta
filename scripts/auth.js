window.onload = function () {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    window.location.href = './index.html';
  }
};
  