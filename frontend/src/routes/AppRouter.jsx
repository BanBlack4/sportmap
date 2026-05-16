import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ClubDetailPage } from "../pages/ClubDetailPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs/:id" element={<ClubDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
