import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function RootLayout() {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/checkout"];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      <div id="root">
        {shouldShowHeaderFooter && <Header />}
        <main>
          <Outlet />
        </main>
        {shouldShowHeaderFooter && <Footer />}
      </div>
    </>
  );
}
