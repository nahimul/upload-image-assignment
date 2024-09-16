import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddEmployee from './components/AddEmployee.js';
import EditEmployee from './components/EditEmployee.js';
import EmployeeList from './components/EmployeeList.js';

function App() {

  const router = createBrowserRouter([
    {
      name: 'add-employee',
        path:'/add-employee',
        element: <AddEmployee />
    },
    {
      name: 'edit-employee',
      path:'/edit-employee',
      element: <EditEmployee />
    },
    {
      name: 'employee-list',
      path:'/employee-list',
      element: <EmployeeList />
    }

  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
