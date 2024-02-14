import { json } from "@remix-run/node";
import { mapFirebaseDocuments } from "../helpers/firebaseDataMapper";
import { useLoaderData } from "@remix-run/react";
import PhotoCard from "../components/PhotoCard";

export const meta = () => {
    return [{ title: "Remix Photo App - Photos" }];
};

export async function loader() {
    const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos"
    );
    const docs = await response.json();
    const photos = mapFirebaseDocuments(docs);
    photos.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime()); // sort by newest first
    return json({ photos });
}

export default function Photos() {
    const { photos } = useLoaderData();
    return (
        <div className="page">
            <h1>Photos</h1>
            <section className="grid">
                {photos.map(photo => (
                    <PhotoCard photo={photo} key={photo.id} />
                ))}
            </section>
        </div>
    );
}
