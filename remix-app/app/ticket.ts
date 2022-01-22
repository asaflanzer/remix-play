import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";
import { v4 as uuidv4 } from 'uuid';

export type Ticket = {
    ticketId: string;
    title: string;
};

type NewTicket = {
    name: string;
    email: string;
    phone: number;
};

export type PostMarkdownAttributes = {
    title: string;
};

// relative to the server output not the source!
const ticketsPath = path.join(__dirname, "..", "tickets");

function isValidPostAttributes(
    attributes: any
): attributes is PostMarkdownAttributes {
    return attributes?.title;
}

export async function getTickets() {
    const dir = await fs.readdir(ticketsPath);
    return Promise.all(
        dir.map(async filename => {
            const file = await fs.readFile(
                path.join(ticketsPath, filename)
            );
            const { attributes } = parseFrontMatter(
                file.toString()
            );
            invariant(
                isValidPostAttributes(attributes),
                `${filename} has bad meta data!`
            );
            return {
                ticketId: filename.replace(/\.md$/, ""),
                info: attributes.title
            };
        })
    );
}

export async function createTicket(ticket: NewTicket) {
    const ticketId = uuidv4()
    const md = `---\ntitle: ${ticket.name}\n---\n\n${ticket.email}\n---\n\n${ticket.phone}`;

    await fs.writeFile(
        path.join(ticketsPath, ticketId + ".md"),
        md
    );

    return getTicket(ticketId);
}

export async function getTicket(ticketId: string) {
    const filepath = path.join(ticketsPath, ticketId + ".md");
    const file = await fs.readFile(filepath);
    const { attributes, body } = parseFrontMatter(
        file.toString()
    );
    invariant(
        isValidPostAttributes(attributes),
        `Ticket ${filepath} is missing attributes`
    );
    const html = marked(body);
    return { ticketId, html, info: attributes.title };
}

