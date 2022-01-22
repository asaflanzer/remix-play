import { Form } from "@remix-run/react";

export default function NewJoke() {

    return (
        <div>
            <p>Add your own joke</p>
        <Form>
            <label htmlFor="name">Name </label>
            <input id="name" name="name" type="text" />
            <br/>
            <br/>
            <label htmlFor="content">Content </label>
            <textarea rows="5" id="content" name="content" type="text" />
            <br/>
            <br/>
            <button type="submit">Add</button>
        </Form>
        </div>
    )
}