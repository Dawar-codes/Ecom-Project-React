import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useEffect } from "react";

import CartPage from "../../pages/Cart";
import { useSelector } from "react-redux";

export default function RootLayout() {
  const location = useLocation();

  const noHeaderFooterRoutes = ["/checkout"];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(
    location.pathname
  );

  const modal = useSelector((state) => state.modal.open);

  useEffect(() => {
    console.log(modal);
  }, [modal]);

  return (
    <>
      <div id="root">
        {shouldShowHeaderFooter && <Header />}
        {modal && <CartPage />}

        <main>
          <Outlet />
        </main>
        {shouldShowHeaderFooter && <Footer />}
      </div>
    </>
  );
}
