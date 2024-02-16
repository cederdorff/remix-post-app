import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "../components/PostCard";
import mongoose from "mongoose";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader() {
  const users = await mongoose.models.User.find();
  console.log(users);
  return json({ users });
}

export default function Index() {
  const { users } = useLoaderData();
  return (
    <div className="page">
      <h1>Users</h1>
      <section className="grid">
        {users.map(user => (
          <div className="user-card">
            <img src={user.image} alt="" />
            <h3>{user.name}</h3>
            <p>{user.title}</p>
            <p>{user.mail}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
