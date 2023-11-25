import { path } from './utils/constant'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, HomePage, Forgot, Register } from './containers/Public'
import { HomeServer, Dashboard } from './containers/System'

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
