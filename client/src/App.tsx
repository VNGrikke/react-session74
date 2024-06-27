import ListProduct from './components/ListProduct'
import Cart from './components/Cart'

export default function App() {
  return (
    <div className='flex p-4'>
      <ListProduct/>
      <Cart/>
    </div>
  )
}
