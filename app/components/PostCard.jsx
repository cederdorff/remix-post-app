import { Link } from "@remix-run/react";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  return (
    <Link className="post-link" to={`/posts/${post.id}`}>
      <article className="post-card">
        <UserAvatar uid={post.uid} />
        <img src={post.image} alt={post.caption} />
        <h3>{post.caption}</h3>
      </article>
    </Link>
  );
}
