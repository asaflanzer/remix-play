import type { LinksFunction } from "remix";
import styles from "../styles/index.css";
import globalStyles from "../styles/global.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: styles },
        { rel: "stylesheet", href: globalStyles }
    ]
}

export default function Index() {

    return (
        <h1>Hello</h1>
    )
}