# Titans Coffee Run Project Analysis

## 1. Data Structure - What information does this app track?

### Current Data Model (Based on db.json and JavaScript classes):

**Order Entity:**
- `id`: Unique identifier
- `date`: Order date
- `product`: Object containing:
  - `name`: Product name (Cappuccino, Macaroons, Donuts)
  - `price`: Fixed price per item ($9, $4, $5)
  - `size`: Small, Medium, Large
  - `quantity`: Number of items
- `notes`: Special instructions (from menu form)

**User Entity (stored in localStorage):**
- `email`: User's email address (used as username)
- `password`: User's password

**Product Entity (hardcoded in JavaScript):**
- `name`: Product name
- `price`: Fixed price

## 2. User Flow - How does this app work?

### Current User Journey:
1. **Home Page** (`index.html`) - Landing page with rotating coffee images
2. **Account Creation** (`create-new-account.html`) - Register with email/password
3. **Login** (`login.html`) - Authenticate user
   - Regular users → Menu page
   - Admin user (admin/test123) → Sales dashboard
4. **Menu/Ordering** (`menu.html`) - Select products, sizes, quantities
5. **Checkout** (`checkout.html`) - Review order and confirm
6. **Sales Dashboard** (`sales.html`) - Admin-only view of sales data

### User Types:
- **Regular Users**: Can create accounts, login, place orders
- **Admin**: Special hardcoded credentials for sales analytics
- **Anonymous**: Can only view home page and apply for credit

### Authentication Flow:
- Uses localStorage for user data storage
- No server-side authentication
- Basic client-side validation only

## 3. Key Features - What functionality exists?

### ✅ Implemented Features:
- **User Authentication**: Registration, login, password reset
- **Product Catalog**: Fixed menu with 3 items (Cappuccino, Macaroons, Donuts)
- **Shopping Cart**: LocalStorage-based cart with add/remove functionality
- **Order Management**: Place orders, view order summary
- **Payment Simulation**: Total calculation (no actual payment processing)
- **Donation Feature**: Optional $2 Titan Fund donation
- **Admin Dashboard**: Sales analytics with Chart.js visualization
- **Credit Application**: Standalone credit qualification form
- **Responsive Design**: Mobile-friendly navigation and layouts

### ❌ Missing Features:
- **Order Editing/Deletion**: Orders cannot be modified after creation
- **Real Payment Processing**: No actual payment gateway integration
- **Real-time Updates**: No live notifications or updates
- **User Profiles**: No user management beyond basic auth
- **Inventory Management**: No stock tracking
- **Order History**: No persistent order tracking per user
- **Multi-location Support**: Single delivery concept only

## 4. Current Frontend Structure:

### Main HTML Pages:
- **`index.html`**: Home/landing page with image carousel
- **`login.html`**: User authentication form
- **`create-new-account.html`**: User registration form
- **`reset-password.html`**: Password reset functionality
- **`menu.html`**: Product ordering interface
- **`checkout.html`**: Order review and confirmation
- **`sales.html`**: Admin sales analytics dashboard
- **`apply-for-credit.html`**: Credit application form

### Forms Users Fill Out:
1. **Registration Form**: Email, password, confirm password
2. **Login Form**: Username (email), password
3. **Menu/Order Form**: Product selections, sizes, quantities, special notes
4. **Credit Application**: Personal info, income, SSN (last 4 digits)
5. **Password Reset**: Username, new password

### Data Display (Lists/Tables):
- **Checkout Table**: Order summary with product, size, quantity, price, notes
- **Sales Chart**: Quarterly sales data visualization using Chart.js
- **Credit Results Table**: Application validation results
- **Registration Results Table**: Account creation validation feedback

### JavaScript Architecture:
- **Object-oriented approach**: Product and Order classes
- **Event-driven**: DOM event listeners for form submissions
- **Local Storage**: Client-side data persistence
- **REST API integration**: Fetches sales data from JSON server
- **Modular structure**: Separate JS files for different functionalities

### Styling:
- **CSS Grid/Flexbox**: Responsive layout system
- **Mobile-first design**: Hamburger menu for small screens
- **Component-based CSS**: Separate stylesheets for different pages
- **SCSS structure**: Organized but mostly empty partials