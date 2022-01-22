import { Outlet, Link, useLoaderData } from "remix";
import { getTickets } from "~/ticket";
import type { Ticket } from "~/ticket";
import adminStyles from "~/styles/admin.css";

export const links = () => {
    return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = () => {
    return getTickets();
};

export default function Admin() {
    const tickets = useLoaderData<Ticket[]>();
    return (
        <div className="admin">
            <br/>
            <div>Welcome to the admin panel</div>
            <br/>
            <main>
                <Outlet />
            </main>
        </div>
    );
}