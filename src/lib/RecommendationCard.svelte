<script>
	import { fade } from 'svelte/transition'
	import LoadingCard from './LoadingCard.svelte'
	import { z } from 'zod'
	const bookSchema = z.object({
		docs: z.array(
			z.object({
				author_name: z.array(z.string()),
				cover_i: z.number().optional(),
				first_publish_year: z.number(),
				number_of_pages_median: z.number(),
				ratings_average: z.number().optional()
			})
		)
	})
	/**
	 * @type {{title: string, description: string}}
	 */
	export let recommendation
	async function getRecommendationInfo() {
		const response = await fetch('/api/getMediaDetails', {
			method: 'POST',
			body: JSON.stringify({ title: recommendation.title }),
			headers: {
				'content-type': 'application/json'
			}
		})
		let recommendationDetails = await response.json().then((res) => {
   return bookSchema.parse(res)
  })
		return recommendationDetails
	}
	let promise = getRecommendationInfo()
</script>

<div>
	{#await promise}
		<LoadingCard incomingStream={false} />
	{:then data}
		{#if data.docs[0].cover_i}
			<div
				in:fade
				class="relative flex flex-col md:flex-row bg-neutral-800/70 shadow-md p-6"
			>
				<div
					class="hidden md:block h-[250px] flex-none w-1/5 bg-cover bg-center"
					style={`background-image: url(https://covers.openlibrary.org/b/id/${
						data.docs[`0`].cover_i
					}-M.jpg)`}
				/>
				<div
					class="md:hidden z-10 absolute inset-0 bg-cover bg-center"
					style={`background-image: url(https://covers.openlibrary.org/b/id/${
						data.docs[`0`].cover_i
					}-M.jpg)`}
				>
					<div
						class="w-full h-full bg-black/80 bg-blur-sm"
					/>
				</div>
				<div
					class="z-40 flex flex-col justify-between md:ml-6 pt-32 md:pt-0"
				>
					<div>
						<div class="flex items-end">
							<div
								class="font-bold text-white text-3xl"
							>
								{recommendation.title}
								<span
									class="font-bold text-stone-200/60 text-xl ml-2"
									>{data.docs[0].first_publish_year}</span
								>
							</div>
						</div>
						{#if (data.docs[0].author_name).length >= 1}
						<div class="h-2"/>
						<div class="flex flex-row gap-2">
							<span class="text-md text-sky-50/30">by</span>
							{#each data.docs[0].author_name as author} 
							<span class="text-md text-sky-50/70">{author}</span>
							{/each}
						</div>
						{/if}
						<div class="h-4"/>
						<div class="text-sky-50/80">
							{recommendation.description}
						</div>
						<div class="h-4"/>
						<div class="text-stone-200/50">
							Pages: {data.docs[0]
								.number_of_pages_median}
						</div>
					<div class="h-4"/>
					</div>
					<div class="flex items-center">
      {#if data.docs[0].ratings_average}
						<div
							class="py-1 px-2 rounded-sm text-sky-50 border border-sky-200 text-xs"
						>
							{data.docs[0].ratings_average}
						</div>
      {/if}
					</div>
				</div>
			</div>
		{:else}
			<div
				in:fade
				class="relative flex flex-col md:flex-row bg-neutral-800/70 shadow-md p-6"
			>
				<div
					class="text-white/50 flex items-center justify-center h-[250px] flex-none w-1/5 bg-neutral-900"
				>
					<svg
						width="35"
						height="35"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M0.75 2.25C0.75 1.42157 1.42157 0.75 2.25 0.75H21.75C22.5784 0.75 23.25 1.42157 23.25 2.25V21.75C23.25 22.5784 22.5784 23.25 21.75 23.25H2.25C1.42157 23.25 0.75 22.5784 0.75 21.75V2.25Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M5.25 17.25L8.712 12.634C8.97285 12.286 9.37191 12.0683 9.80575 12.0374C10.2396 12.0065 10.6655 12.1654 10.973 12.473L12 13.5L15.3 9.1C15.5833 8.72229 16.0279 8.5 16.5 8.5C16.9721 8.5 17.4167 8.72229 17.7 9.1L20.37 12.66"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M6.375 8.25C7.41053 8.25 8.25 7.41053 8.25 6.375C8.25 5.33947 7.41053 4.5 6.375 4.5C5.33947 4.5 4.5 5.33947 4.5 6.375C4.5 7.41053 5.33947 8.25 6.375 8.25Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M0.75 17.25H23.25"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div
					class="md:hidden z-10 absolute inset-0 bg-cover bg-center"
				>
					<div
						class="w-full h-full bg-black/80 bg-blur-sm"
					/>
				</div>

				<div
					class="z-40 flex flex-col justify-between md:ml-6"
				>
					<div>
						<div class="flex items-end mb-4">
							<div
								class="font-bold text-slate-200 text-3xl"
							>
								{recommendation.title}
								<span
									class="font-bold text-slate-200/60 text-xl ml-2"
									>N/A</span
								>
							</div>
						</div>
						<div class="text-slate-200/90 mb-4">
							{recommendation.description}
						</div>
					</div>
				</div>
			</div>
		{/if}
	{:catch error}
		<div
			in:fade
			class="relative flex flex-col md:flex-row bg-neutral-800/70 shadow-md p-6"
		>
			<div
				class="text-white/50 flex items-center justify-center h-[250px] flex-none w-1/5 bg-neutral-900"
			>
				<svg
					width="35"
					height="35"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0.75 2.25C0.75 1.42157 1.42157 0.75 2.25 0.75H21.75C22.5784 0.75 23.25 1.42157 23.25 2.25V21.75C23.25 22.5784 22.5784 23.25 21.75 23.25H2.25C1.42157 23.25 0.75 22.5784 0.75 21.75V2.25Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M5.25 17.25L8.712 12.634C8.97285 12.286 9.37191 12.0683 9.80575 12.0374C10.2396 12.0065 10.6655 12.1654 10.973 12.473L12 13.5L15.3 9.1C15.5833 8.72229 16.0279 8.5 16.5 8.5C16.9721 8.5 17.4167 8.72229 17.7 9.1L20.37 12.66"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M6.375 8.25C7.41053 8.25 8.25 7.41053 8.25 6.375C8.25 5.33947 7.41053 4.5 6.375 4.5C5.33947 4.5 4.5 5.33947 4.5 6.375C4.5 7.41053 5.33947 8.25 6.375 8.25Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M0.75 17.25H23.25"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div
				class="md:hidden z-10 absolute inset-0 bg-cover bg-center"
			>
				<div class="w-full h-full bg-black/80 bg-blur-sm" />
			</div>

			<div
				class="z-40 flex flex-col justify-between md:ml-6"
			>
				<div>
					<div class="flex items-end mb-4">
						<div class="font-bold text-slate-200 text-3xl">
							{recommendation.title}
							<span
								class="font-bold text-slate-200/60 text-xl ml-2"
								>N/A</span
							>
						</div>
					</div>
					<div class="text-slate-200/90 mb-4">
						{recommendation.description}
					</div>
				</div>
			</div>
		</div>
	{/await}
</div>
