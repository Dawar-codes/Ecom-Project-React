import { Link } from "react-router-dom";


export default function MainNavigation() {
  return (
    <header>
      <nav className="flex justify-between">

        <h1>hello</h1>
        <Link to="products">go to products</Link>
      </nav>
    </header>
  );
}
