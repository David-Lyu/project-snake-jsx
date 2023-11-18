import { RouterProvider } from 'react-router-dom';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App({ router }: { router: any }) {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
