import { json } from "@remix-run/node";
import { mapFirebaseDocuments } from "../helpers/firebaseDataMapper";
import { useLoaderData } from "@remix-run/react";
import PostCard from "../components/PostCard";

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
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </div>
  );
}
