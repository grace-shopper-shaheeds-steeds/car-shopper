/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export { ProductsList, AddProduct, AddCategory, UpdateProduct, ProductSingle, ProductSearchResults} from './products'
export {default as Cart} from './Cart'
export {default as LandingHome } from './landing-home'
export {default as UserList} from './UserList'
export { OrderCreate, OrderBilling, OrderCart, OrderPayment, OrderItem, OrdersList, OrderSingle } from './orders'
