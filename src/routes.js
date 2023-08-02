import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import FormPages from './pages/FormPages';
import FormEdit from './pages/FormEdit';
import FormCreateProductPage from './pages/FormCreateProductPage';
import FormEditProduct from './pages/FormEditProduct';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'product', element: <ProductPage/> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },

    // {
    //   path: 'create',
    //   element: <FormPages />,
    // },

    {
      path: '/category',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'create', element: <FormPages /> },
        { path: 'showDetail/:id', element: <FormEdit /> },
        // { path: 'edit/:id', element: <FormEdit /> },
      ],
    },

    {
      path: '/product',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'create', element: <FormCreateProductPage/> },
        { path: 'showDetail/:id', element: <FormEditProduct /> },
        // { path: 'edit/:id', element: <FormEdit /> },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
