import Home from './pages/Home';
import Categories from './pages/Categories';

const home = {
  path:'/',
  component:Home,
  header:false
}

const categories = {
  path:'/categories',
  component:Categories,
  header:true,
  id:1
}

const userRoutes = [home, categories]

export {
  userRoutes
}