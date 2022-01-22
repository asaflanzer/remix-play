import { Link, useLoaderData } from "remix";
import { getTickets } from "~/ticket";
import type { Ticket } from "~/ticket";

export const loader = () => {
    return getTickets();
};
export default function Tickets() {
    const tickets = useLoaderData<Ticket[]>();

    return (
        <div className="min-h-screen flex justify-center bg-gray-50">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Id</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {tickets.map(({ticketId, info}) => {
                                    return (
                                        <tr key={ticketId}>
                                            <td className="px-6 py-4 whitespace-nowrap">{ticketId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{info}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    N/A
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    more info missing
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">N/A</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}