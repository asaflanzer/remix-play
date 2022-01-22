import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css"

export const meta: MetaFunction = () => {
    return { title: "Waitlist" };
};

export const links = () => {
    return [
        { rel: "stylesheet", href: styles },
        {rel: "stylesheet", href: "https://rsms.me/inter/inter.css"}
    ];
};

export default function App() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <body>
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <Link to="/admin">View all tickets</Link>
                <Outlet />
            </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
        </html>
    );
}
