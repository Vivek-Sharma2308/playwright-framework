export const Locators = {
  // Login Page
  signInButton: 'a[data-nav-role="signin"]',  // Example selector; adjust based on actual HTML
  emailInput: '#ap_email',
  passwordInput: '#ap_password',
  signInSubmit: '#signInSubmit',

  // Search Page
  searchInput: '#twotabsearchtextbox',
  searchButton: '#nav-search-submit-button',
  productLink: (productPath: string) => `//h2[contains(@aria-label, '${productPath}')]`,  // Dynamic locator

  // Cart Page
  cartIcon: '#nav-cart',
  cartCount: '#nav-cart-count',
  deleteButton: "//input[@value='Delete']",
  cartItemsNumber: "//a[contains(@aria-label, 'in cart')]",

  // General
  addToCartButton: 'button[name="submit.add-to-cart"]',
};