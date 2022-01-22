import { useTransition, useActionData, Form, redirect } from "remix";
import type { ActionFunction } from "remix";
import { createTicket } from "~/ticket";
import invariant from "tiny-invariant";

import indexStyles from "~/styles/index.css";

export const links = () => {
    return [{ rel: "stylesheet", href: indexStyles }];
};

type FormError = {
    name?: boolean;
    email?: boolean;
    phone?: boolean;
};

export const action: ActionFunction = async ({ request }) => {

    await new Promise(res => setTimeout(res, 1000));

    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");

    const errors: FormError = {};
    if (!name) errors.name = true;
    if (!email) errors.email = true;
    if (!phone) errors.phone = true;

    if (Object.keys(errors).length) {
        return errors;
    }

    invariant(typeof name === "string");
    invariant(typeof email === "string");
    invariant(typeof phone === "string");

    const { ticketId } = await createTicket({ name, email, phone });

    return redirect(`/${ticketId}`);
};

export default function Index() {
    const errors = useActionData();
    const transition = useTransition();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    {/*<img class="scale-15" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />*/}
                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                          Welcome to Waitlist
                     </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                          Fill in your details and <b>grab a ticket</b> without actually waiting in line
                    </p>
                </div>
                <Form className="mt-8 space-y-6" method="post">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only" />
                            <input id="name" name="name" type="text"
                                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                     placeholder="Full name" />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only" />
                            <input id="email-address" name="email" type="email" autoComplete="email"
                                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                     placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only" />
                            <input id="phone" name="phone" type="text"
                                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                     placeholder="Phone number" />
                        </div>
                    </div>
                    {/*{errors?.name ? (*/}
                    {/*    <em>Name is required</em>*/}
                    {/*) : null}*/}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          {transition.submission
                              ? "Joining..."
                              : "Join the line"}
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-gray-600 hover:text-black-500">
                              Employee access only
                            </a>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
