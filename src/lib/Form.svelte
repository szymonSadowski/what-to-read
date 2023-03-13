<script>
	import LoadingIndicator from './Loading.svelte'
	import { categories } from '../const/categories'
	import { bookTypes } from '../const/bookTypes'
	/**
	 * @type string
	 */
	export let cinemaType
	/**
	 * @type Array<string>
	 */
	export let selectedCategories
	/**
	 * @type string
	 */
	export let specificDescriptors
	/**
	 * @type Boolean
	 */
	export let loading

</script>

		<div class="h-8" />
		<div class="font-semibold text-lg text-sky-50">
			What kind of read you are into?
		</div>
		<div class="h-4" />
		<div class="flex items-center gap-3">
			{#each bookTypes as type (type.value)}
				<button
					on:click={() => {
						cinemaType = type.value
					}}
					class={`${
						cinemaType === type.value
							? 'bg-sky-700/50 border-sky-900 shadow-md shadow-sky-800/20'
							: ''
					} text-sky-50 font-bold text-sm py-2 px-4 rounded-sm border border-sky-200 shadow-md shadow-sky-300/20 hover:bg-sky-300/50`}
				>
					{type.title}
				</button>
			{/each}
		</div>
		<div class="h-8" />
		<div>
			<div class="font-semibold text-lg text-sky-50">
				Choose categories you want your book to include:
			</div>
			<div class="h-4" />
			<div class="flex items-center flex-wrap gap-3">
				{#each categories as category}
					<label
						class={`${
							selectedCategories.includes(category)
								? 'bg-sky-700/50 border-sky-900 shadow-md shadow-sky-800/20'
								: ''
						} text-sky-50 font-bold text-sm py-2 px-4 rounded-sm border border-sky-200 shadow-md shadow-sky-300/20 hover:bg-sky-300/50`}
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
		<div class="h-8" />
		<div class="font-semibold text-lg text-sky-50">
			Tell us more to give you the best list possible!
		</div>
		<div class="h-4" />
		<textarea
			bind:value={specificDescriptors}
			class="w-full h-20 text-sky-50 text-sm py-2 px-4 rounded-sm border border-sky-200 shadow-md shadow-sky-300/20 bg-stone-900 placeholder:text-sky-50/30"
			placeholder="For example: Polish as original language and at least 4 books in the series"
		/>
		<div class="h-8" />
		<button
			on:click
			class={`${
				loading
					? 'bg-sky-900'
					: 'bg-sky-700 hover:bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 shadow-md shadow-sky-500/50"'
			} w-full h-10 text-sky-50 font-bold p-3 rounded-s flex items-center justify-center`}
		>
			{#if loading}
				<LoadingIndicator />
			{:else}
				<p>Find me a good read!</p>
			{/if}
		</button>
