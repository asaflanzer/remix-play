import {LinksFunction, Outlet} from "remix";
import styles from "~/styles/index.css";
import globalStyles from "~/styles/global.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: globalStyles }
    ]
}

export default function Jokes() {

    return (
        <>
            <h1>Parent Jokes</h1>
            <Outlet />
        </>
    )
}