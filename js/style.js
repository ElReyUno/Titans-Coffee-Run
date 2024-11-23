// Accessible Toggling Menu Button (For Smaller Screens)
const toggleMenu = document.getElementById('toggleMenu');
const navigation = document.querySelector('nav ul');

if (toggleMenu && navigation) {
  toggleMenu.addEventListener('click', () => {
    navigation.classList.toggle('open');
    toggleMenu.textContent = navigation.classList.contains('open') ? 'Close' : 'Menu';
  });
} else {
  console.error('Error: Could not find the menu button or navigation element.');
}
