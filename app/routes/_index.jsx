import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "../components/PostCard";
import { mapFirebaseDocuments } from "../helpers/firebaseDataMapper";

export const meta = () => {
  return [{ title: "Remix Post" }];
};

export async function loader() {
  const response = await fetch(
    "https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos"
  );
  const docs = await response.json();
  const posts = mapFirebaseDocuments(docs);
  posts.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime()); // sort by newest first
  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData();
  return (
    <div className="page">
      <h1>Posts</h1>
      <section className="grid">
        {posts.map(post => (
          <Link key={post.id} className="post-link" to={`/posts/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </section>
    </div>
  );
}
