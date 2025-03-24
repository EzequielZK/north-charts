import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/getNorthData');
		const northData = await response.json();

		return {
			...northData
		};
	} catch (err: any) {
		return {
			props: {
				error: err.message
			}
		};
	}
};
