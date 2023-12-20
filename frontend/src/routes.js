import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CustomerCreate from "./pages/Customers/Create";
import CustomerEdit from "./pages/Customers/Edit";
import CustomerList from "./pages/Customers/List";
import CustomerView from "./pages/Customers/View";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers">
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/new" element={<CustomerCreate />} />
        <Route path="/customers/:id" element={<CustomerEdit />} />
        <Route path="/customers/view/:id" element={<CustomerView />} />
      </Route>
    </Routes>
  );
}
