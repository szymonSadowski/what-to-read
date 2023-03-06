<script lang='ts'>
	import { categories } from '../const/categories'

	let selectedCategories: Array<string> = []
	let additionalRequest = ''

	function findMeABook() {
		const categories = selectedCategories.join(',')
		const request = additionalRequest
		console.log(categories, request)
	}
</script>

<section>
	<h1
		class="text-center font-extrabold text-black text-5xl tracking-tight md:text-8xl"
	>
		What to read
	</h1>
	<div class="h-4" />
	<h3 class="text-center text-black text-2xl md:text-3xl">
		You don't know what to read?
	</h3>
	<div class="h-2" />
	<h2
		class="text-center font-semibold text-black text-2xl md:text-4xl"
	>
		Great, let <span
			class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
			>AI</span
		> help you
	</h2>
</section>

<div class="h-16" />
<section>
	<h3 class="font-semibold text-xl md:text-l">
		Select all categories you think you want your book to
		include
	</h3>
	<div class="h-4" />
	<div>
		{#each categories as category (category)}
			<label class="inline-flex items-center p-1">
				<input
					type="checkbox"
					class="form-checkbox h-3 w-3"
					bind:group={selectedCategories}
					value={category}
				/>
				<span class="ml-2">{category}</span>
			</label>
		{/each}
	</div>
</section>
<div class="h-8" />
<section>
	<h3 class="font-semibold text-xl md:text-l">
		Here write any additional requests you may have
	</h3>
	<div class="h-4" />
	<div>
		<textarea
			class="w-full p-4 rounded-md"
			placeholder="I want a book about..."
			bind:value={additionalRequest}
		/>
	</div>
</section>

<div class="h-16" />
<button
	on:click={findMeABook}
	class="w-full bg-gradient-to-r from-purple-400 to-pink-600 text-white font-semibold p-4 rounded-md"
>
	Find me a book
</button>
