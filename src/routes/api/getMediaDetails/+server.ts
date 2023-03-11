import { json } from '@sveltejs/kit'

export async function POST({ request }: { request: any }) {
	const { title } = await request.json()

	// this regex changes spaces to + in titles
	const titleWithPluses = title.replace(/\s+/g, '+')

	const url = `https://openlibrary.org/search.json?q=${titleWithPluses}&fields=author_name,title,first_publish_year,number_of_pages_median,ratings_average,cover_i,availability&limit=1`
	const res = await fetch(url)
	const details = await res.json()
	return json(details)
}
