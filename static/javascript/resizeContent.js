function calculateContentHeight() {
  let navbar = document.getElementById('mainNav');
  let content = document.getElementById('content');

  let navbarHeight = navbar.clientHeight;
  let windowHeight = window.innerHeight;
  let contentHeight = windowHeight - navbarHeight;

  content.style.height = contentHeight + 'px';
}

export default calculateContentHeight;
