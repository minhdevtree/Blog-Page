import axios from 'axios';

export default async function HelloWorldPage() {
    const result = await fetch('http://localhost:3000/api').then(res =>
        res.json()
    );
    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}
