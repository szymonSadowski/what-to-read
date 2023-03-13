interface Book {
 value: string, 
 title: string
}

export const bookTypes: Array<Book> = [
	{ value: 'book', title: 'Book' },
	{ value: 'manga', title: 'Manga' },
	{ value: 'comic book', title: 'Comic' },
	{
		value: 'book, movie or comic book',
		title: 'Random'
	}
]
