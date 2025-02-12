import { useRouteError } from "react-router-dom";

export default function ErrorPage({ title, message }) {
  const error = useRouteError();

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page.";
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}
