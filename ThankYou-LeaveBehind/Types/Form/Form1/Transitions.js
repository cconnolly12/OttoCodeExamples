export default () => {
  const formElement = document.getElementById('dynamicLBForm');
  formElement.style.opacity = '0';
  formElement.style.transition = 'none';
  setTimeout(() => {
    formElement.style.transition = 'all .65s ease-in';
    formElement.style.opacity = '1';
  }, 25);
};
