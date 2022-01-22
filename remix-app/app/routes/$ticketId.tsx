import {Form, useLoaderData} from "remix";
import type { LoaderFunction } from "remix";
import { getTicket } from "~/ticket";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.ticketId, "expected params.ticket");
    return getTicket(params.ticketId);
};

export default function Ticket() {
    const ticket = useLoaderData();
    console.log(ticket)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h4 className="mt-6 text-center text-4xl font-extrabold text-gray-900">{ticket.info}</h4>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {ticket?.ticketId}
                    </h2>

                    <div className="mt-2 text-center text-sm text-gray-600">
                        <div dangerouslySetInnerHTML={{ __html: ticket.html }} />
                    </div>
                </div>
            </div>
        </div>
    )
}