// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResponsiveProvider } from './contexts/ResponsiveProvider';
import './styles/global.css';
// App.css는 삭제하거나 필요한 부분만 global.css로 이동

// Layouts
import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Admin 페이지들
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/orders";
import Login from "./pages/admin/Login";

// User 페이지
import Home from "./pages/user/Home";

function App() {
  return (
    <ResponsiveProvider>
      <Router>
        <Routes>
          {/* 사용자 페이지 - 레이아웃 적용 */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<div>상품 목록 페이지</div>} />
            <Route path="cart" element={<div>장바구니 페이지</div>} />
            <Route path="about" element={<div>소개 페이지</div>} />
          </Route>
          
          {/* 로그인 (레이아웃 없음) */}
          <Route path="/login" element={<Login />} />
          
          {/* 관리자 페이지 */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Routes>
      </Router>
    </ResponsiveProvider>
  );
}

export default App;