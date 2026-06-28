import { RouterProvider } from 'react-router';
import { router } from './routes';
import '../styles/main.scss';

export default function App() {
  return <RouterProvider router={router} />;
}