import { path } from './utils/constant'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, HomePage, Forgot, Register } from './containers/Public'
import {
  HomeServer, Dashboard, Type, Sample, Category, Account, Size, List, Menu,
  Dimension, State, Slide, Color, Image, Invoice, Product, Transfer, Quantity, Function, CreateImage,
  Permission, Role, Transmission, Allocation, TransferPage, CreateProduct, UpdateProduct, CreateDetail
} from './containers/System'

function App() {
  return (
    <div className="h-screen w-full bg-white">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='*' element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.FORGOT} element={<Forgot />} />
          <Route path={path.REGISTER} element={<Register />} />
        </Route>

        <Route path={path.HOMESERVER} element={<HomeServer />}>
          <Route path='*' element={<Dashboard />} />
          <Route path={path.SLIDE} element={<Slide />} />
          <Route path={path.ACCOUNT} element={<Account />} />
          <Route path={path.INVOICE} element={<Invoice />} />

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
    </div>
  );
}

export default App;
