export const meta = () => {
    return [{ title: "Remix Photo App" }];
};

export default function Index() {
    return (
        <div className="page">
            <h1>Welcome to Remix</h1>
            <p>
                This is a simple photo app built with <a href="https://remix.run">Remix</a>.
            </p>
        </div>
    );
}
