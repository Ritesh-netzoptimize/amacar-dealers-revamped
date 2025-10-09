// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layout/DashboardLayout/DashboardLayout";
import ActiveCustomers from "./pages/dashboard/ActiveCustomers";
import Appointments from "./pages/dashboard/Appointments";
import Dashboard from "./pages/dashboard/Dashboard";
import DealerShips from "./pages/dashboard/DealerShips";
import HighestBids from "./pages/dashboard/HighestBids";
import LiveAuctions from "./pages/dashboard/LiveAuctions";
import MyBids from "./pages/dashboard/MyBids";
import NewCustomers from "./pages/dashboard/NewCustomers";
import Reports from "./pages/dashboard/Reports";
import WonAuctions from "./pages/dashboard/WonAuctions";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/dashboard/Profile";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import BackToTop from "./components/ui/BackToTop";
import VehicleDetails from "./pages/dashboard/VehicleDetails";
import CheckoutPage from "./components/stripe/CheckoutPage";
import PaymentSuccess from "./components/stripe/PaymentSuccess";
import { SearchProvider } from "./context/SearchContext";
import InvitedDealerships from "./pages/dashboard/InvitedDealerships";

function App() {
  // const location = useLocation();
  // const hideHeaderFooter =
  // location.pathname.startsWith('/dashboard') ||
  // location.pathname.startsWith('/auctions') ||
  // location.pathname.startsWith('/pending-offers') ||
  // location.pathname.startsWith('/offers') ||
  // location.pathname.startsWith('/accepted') ||
  // location.pathname.startsWith('/appointments') ||
  // location.pathname.startsWith('/profile') ||
  // location.pathname.startsWith('/car-details');

  return (
    <SearchProvider>
      <div className="min-h-screen bg-slate-50">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
          containerStyle={{
            marginTop: "60px",
          }}
        />

        {/* {!hideHeaderFooter && <Header />} */}

        <main className="pt-0 bg-white">
          {/* <ScrollToTop /> */}
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:invitations" element={<Register />} />
          {/* Public Routes */}
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
          {/* <Route path="/terms-of-service" element={<TermsOfService />} /> */}
          {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
          {/* <Route path="/cookies-policy" element={<CookiesPolicy />} /> */}
          {/* <Route path="/faq" element={<FAQ />} /> */}
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/live-auctions"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <LiveAuctions />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/won-auctions"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <WonAuctions />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/new-customers"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <NewCustomers />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <Appointments />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/my-bids"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <MyBids />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/highest-bids"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <HighestBids />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/active-customers"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <ActiveCustomers />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/dealerships"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <DealerShips />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/invited-dealerships"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <InvitedDealerships />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          
          <Route
            path="/reports"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              // <PrivateRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
              // </PrivateRoute>
            }
          />
          <Route
            path="/vehicle-details/:id"
            element={
              <DashboardLayout>
                <VehicleDetails />
              </DashboardLayout>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

        </Routes>
      </main>

        {/* {!hideHeaderFooter && <Footer />} */}

        {/* Back to Top Button - Only for public pages */}
        {/* {!hideHeaderFooter && <BackToTop />} */}
        <BackToTop />
      </div>
    </SearchProvider>
  );
}

export default App;
