import { path } from './utils/constant'
import { CartProvider } from './contexts/Cart'
import { Routes, Route } from 'react-router-dom'
import {
  Home, Login, HomePage, Forgot, Register, Cart, Retal, Detail, Personal, Information, ChangePassword,
  Order, Like, UpdateAccount, Payment
} from './containers/Public'
import {
  HomeServer, Dashboard, Type, Sample, Category, Account, List, Menu, Dimension, State, Slide, Color,
  Image, Invoice, Product, Transfer, Quantity, Function, CreateImage, Permission, Role, Transmission, Allocation,
  TransferPage, CreateProduct, UpdateProduct, CreateDetail, Completion, Processing
} from './containers/System'

function App() {
  return (
    <div className="h-screen w-full bg-white">
      <CartProvider>
        <Routes>
          {/* Component-Based Routing: sử dụng element để chỉ định component cần hiển thị cho mỗi route */}
          <Route path={path.HOME} element={<Home />}>
            {/* Wildcard Route:   sử dụng route với * để xác định một route mặc định */}
            <Route path='*' element={<HomePage />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.FORGOT} element={<Forgot />} />
            <Route path={path.REGISTER} element={<Register />} />
            {/* Nested Routes: sử dụng route lồng nhau */}
            <Route path={path.PERSONAL} element={<Personal />}>
              <Route path={path.LIKE} element={<Like />} />
              <Route path={path.ORDER} element={<Order />} />
              <Route path={path.INFORMATION} element={<Information />} />
              <Route path={path.UPDATE_ACCOUNT} element={<UpdateAccount />} />
              <Route path={path.CHANGEPASSWORD} element={<ChangePassword />} />
            </Route>
            <Route path={path.CART} element={<Cart />} component={Cart} />
            <Route path={path.PAYMENT} element={<Payment />} component={Payment} />
            <Route path={path.DETAIL} element={<Detail />} />
            <Route path={path.TOP} element={<Retal />} />
            <Route path={path.OUTER} element={<Retal />} />
            <Route path={path.BOTTOM} element={<Retal />} />
            <Route path={path.ACCESSORIES} element={<Retal />} />
          </Route>

          <Route path={path.HOMESERVER} element={<HomeServer />}>
            <Route path={'*'} element={<Dashboard />} />
            <Route path={path.SLIDE} element={<Slide />} />
            <Route path={path.ACCOUNT} element={<Account />} />
            <Route path={path.INVOICE} element={<Invoice />}>
              <Route path={path.COMPLETION} element={<Completion />} />
              <Route path={path.PROCESSING} element={<Processing />} />
            </Route>
            <Route path={path.TYPE} element={<Type />}>
              <Route path={path.SAMPLE} element={<Sample />} />
              <Route path={path.CATEGORY} element={<Category />} />
            </Route>
            <Route path={path.LIST} element={<List />}>
              <Route path={path.DIMENSION} element={<Dimension />} />
              <Route path={path.COLOR} element={<Color />} />
              <Route path={path.IMAGE} element={<Image />} />
              <Route path={path.PRODUCT} element={<Product />}>
                <Route path={path.CREATE_IMAGE} element={<CreateImage />} />
                <Route path={path.CREATE_DETAIL} element={<CreateDetail />} />
                <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
                <Route path={path.UPDATE_PRODUCT} element={<UpdateProduct />} />
              </Route>
              <Route path={path.QUANTITY} element={<Quantity />} />
              <Route path={path.PERMISSION} element={<Permission />} />
            </Route>
            <Route path={path.ROLE} element={<Role />}>
              <Route path={path.MENU} element={<Menu />} />
              <Route path={path.STATE} element={<State />} />
              <Route path={path.FUNCTION} element={<Function />} />
              <Route path={path.PERMISSION} element={<Permission />} />
            </Route>
            <Route path={path.TRANSFER} element={<Transfer />}>
              <Route path={path.ALLOCATION} element={<Allocation />} />
              <Route path={path.TRANSFERPAGE} element={<TransferPage />} />
              <Route path={path.TRANSMISSION} element={<Transmission />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
