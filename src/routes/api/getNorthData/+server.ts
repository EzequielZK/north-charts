import { json } from '@sveltejs/kit';
import { NORTH_API, NORTH_KEY } from '$env/static/private'; // 🔒 A API key só pode ser acessada no backend

export async function GET() {
	try {
		const response = await fetch(NORTH_API, {
			headers: { Authorization: NORTH_KEY }
		});

		const data = await response.json();
		return json(data);
	} catch (err: any) {
		return json({ message: err.message }, { status: 500 });
	}
}
