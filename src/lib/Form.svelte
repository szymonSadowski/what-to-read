<script>
	import LoadingIndicator from './Loading.svelte';
	import { categories } from '../const/categories';
	/**
	 * @type string
	 */
	export let cinemaType;
	/**
	 * @type Array<string>
	 */
	export let selectedCategories;
	/**
	 * @type string
	 */
	export let specificDescriptors;
	/**
	 * @type Boolean
	 */
	export let loading;

	let bookTypes = [
		{ value: 'book', title: 'Book' },
		{ value: 'manga', title: 'Manga' },
		{ value: 'comic book', title: 'Comic Book' },
		{ value: 'book, movie or comic book', title: 'Does not matter, just give me something good' }
	];
</script>

<div class="pt-6 md:pt-10 text-black">
	<div>
		<div class="mb-8">
			<div class="mb-4 font-semibold text-lg">What kind of read you are into?</div>
			<div class="flex items-center">
				{#each bookTypes as type (type.value)}
					<button
						on:click={() => {
							cinemaType = type.value;
						}}
						class={`${
							cinemaType === type.value ? 'bg-slate-600/40' : ''
						} text-black font-bold mr-2 text-sm mt-2 py-2 px-4 rounded-full border`}
					>
						{type.title}
					</button>
				{/each}
			</div>
		</div>
		<div>
			<div class="mb-4 font-semibold text-lg">
				Choose categories you want your book to include
			</div>
			<div class="flex items-center flex-wrap">
				{#each categories as category}
					<label
						class={`${
							selectedCategories.includes(category) ? 'bg-slate-600/40' : ''
						} text-black font-bold mr-2 mt-2 text-sm py-2 px-4 rounded-full border`}
					>
						<input
							class="hidden"
							type="checkbox"
							bind:group={selectedCategories}
							name="categories"
							value={category}
						/>
						{category}
					</label>
				{/each}
			</div>
		</div>
		<div class="mt-8">
			<div class="mb-4 font-semibold text-lg">
				Tell us more to give you the best list possible!
			</div>
			<textarea
				bind:value={specificDescriptors}
				class="bg-white/40 border border-white/0 p-2 rounded-md placeholder:text-slate-800 text-slate-900 w-full h-20 font-medium"
				placeholder="For example: Polish as original language and at least 4 books in the series"
			/>
			<button
				on:click
				class={`${
					loading
						? 'bg-slate-600'
						: 'bg-slate-300 hover:bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 '
				} mt-4 w-full h-10 text-white font-bold p-3 rounded-full flex items-center justify-center`}
			>
				{#if loading}
					<LoadingIndicator />
				{:else}
					<p>Find me a good read!</p>
				{/if}
			</button>
		</div>
	</div>
</div>