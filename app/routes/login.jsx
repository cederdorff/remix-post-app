// app/routes/login.tsx
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { sessionStorage } from "../services/session.server";
import { authenticator } from "../services/auth.server";

export async function loader({ request }) {
  // If the user is already authenticated redirect to / directly
  await authenticator.isAuthenticated(request, {
    successRedirect: "/posts"
  });
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));

  const error = session.get("sessionErrorKey");

  return json({ error });
}

export default function Login() {
  // if i got an error it will come back with the loader data
  const loaderData = useLoaderData();

  return (
    <div className="page">
      <Form method="post">
        <input type="email" name="mail" placeholder="mail" required />
        <input type="password" name="password" placeholder="password" autoComplete="current-password" />
        <button>Sign In</button>
      </Form>
      <div>{loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}</div>
    </div>
  );
}

export async function action({ request }) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/posts",
    failureRedirect: "/login"
  });
}
