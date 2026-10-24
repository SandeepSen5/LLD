import { BrowserRouter, Routes, Route } from "react-router-dom";
import Infinitescroll from "./pages/infiniteScroll/infinitescroll";
import Accordian from "./pages/accordian/accordian";
import NestedComments from "./pages/nestedComments/nestedComments";
import Test from "./pages/testFolder/test";
import AnimationDemo from "./pages/animationDemo/animationDemo";
import ProductList from "./pages/productList/productList";
import StarRatingPage from "./pages/starRating/starRating";
import RelativeTimePage from "./pages/relativeTime/relativeTime";
import FaqPage from "./pages/faq/faq";
import KycFormPage from "./pages/kycForm/kycForm";
import FormRerendersPage from "./pages/formRerenders/formRerenders";
import ResponsiveGridPage from "./pages/responsiveGrid/responsiveGrid";
import AutoSuggestPage from "./pages/autoSuggest/autoSuggest";
import Login from "./pages/Login/login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Infinitescroll />
            </PrivateRoute>
          }
        />

        <Route
          path="/accordion"
          element={
            <PrivateRoute>
              <Accordian />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/comments"
          element={
            <PrivateRoute>
              <NestedComments />
            </PrivateRoute>
          }
        />

        <Route
          path="/test"
          element={
            <PrivateRoute>
              < Test />
            </PrivateRoute>
          }
        />

        <Route
          path="/animation"
          element={
            <PrivateRoute>
              <AnimationDemo />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />

        <Route
          path="/star-rating"
          element={
            <PrivateRoute>
              <StarRatingPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/relative-time"
          element={
            <PrivateRoute>
              <RelativeTimePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/faq"
          element={
            <PrivateRoute>
              <FaqPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/kyc-form"
          element={
            <PrivateRoute>
              <KycFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/form-rerenders"
          element={
            <PrivateRoute>
              <FormRerendersPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/responsive-grid"
          element={
            <PrivateRoute>
              <ResponsiveGridPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/auto-suggest"
          element={
            <PrivateRoute>
              <AutoSuggestPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
