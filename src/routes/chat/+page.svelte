<script>
	import * as animateScroll from 'svelte-scrollto'
	import { fade } from 'svelte/transition'
	import Form from '$lib/Form.svelte'
	import LoadingCard from '$lib/LoadingCard.svelte'
	import RecommendationCard from '$lib/RecommendationCard.svelte'

	let loading = false
	let error = ''
	let endStream = false
	/**
	 * @type {string}
	 */
	let searchResponse = ''
	/**
	 * @type {Array<string | {title: string, description: string}>}
	 */
	let recommendations = []
	/**
	 * @param {string} target
	 */
	$: {
		if (searchResponse) {
			let lastLength = recommendations.length
			let x = searchResponse?.split('\n')
			recommendations = x.map((d, i) => {
				if ((x.length - 1 > i || endStream) && d !== '') {
					// @ts-ignore
					const [, title, description] = d.match(
						/\d\.\s*(.*?):\s*(.*)/
					)
					return { title: title, description }
				} else {
					return d
				}
			})
			if (recommendations.length > lastLength) {
				animateScroll.scrollToBottom({ duration: 1500 })
			}
		}
	}
	/**
	 * @type {string}
	 */
	let bookType = 'book'
	/**
	 * @type {Array<string>}
	 */
	let selectedCategories = []
	let specificDescriptors = ''
	async function search() {
		if (loading) return
		recommendations = []
		searchResponse = ''
		endStream = false
		loading = true
		let fullSearchCriteria = `Give me a list of 5 ${bookType} recommendations that are available on google books ${
			selectedCategories
				? `that fit all of the following categories: ${selectedCategories}`
				: ''
		}. ${
			specificDescriptors
				? `Make sure it fits the following description as well: ${specificDescriptors}.`
				: ''
		} ${
			selectedCategories || specificDescriptors
				? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${bookType}'s that I might like.`
				: ''
		} Please return this response as a numbered list with the ${bookType}'s title followed by a colon, and then a brief description of the ${bookType}. There should be a line of whitespace between each item in the list.`
		const response = await fetch('/api/getBooks', {
			method: 'POST',
			body: JSON.stringify({
				searched: fullSearchCriteria
			}),
			headers: {
				'content-type': 'application/json'
			}
		})
		if (response.ok) {
			try {
				const data = response.body
				if (!data) {
					return
				}
				const reader = data.getReader()
				const decoder = new TextDecoder()
				while (true) {
					const { value, done } = await reader.read()
					const chunkValue = decoder.decode(value)
					searchResponse += chunkValue
					if (done) {
						endStream = true
						break
					}
				}
			} catch (err) {
				error = 'Looks like OpenAI timed out :('
			}
		} else {
			error = await response.text()
		}
		loading = false
	}
</script>

<section class="min-h-screen  p-6 md:p-10">
	<div class="h-4" />
	<h1
		class="text-center font-extrabold text-white text-5xl tracking-tight md:text-8xl"
	>
		What to <span
			class="font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-sky-400 to-sky-600"
			>read.</span
		>
	</h1>
	<div class="h-4" />
	<div in:fade class="w-full max-w-4xl mx-auto">
		<div class="w-full">
			<Form
				bind:cinemaType={bookType}
				bind:selectedCategories
				bind:loading
				bind:specificDescriptors
				on:click={search}
			/>
		</div>
		<div class="md:pb-20 max-w-4xl mx-auto w-full">
			{#if loading && !searchResponse && !recommendations}
				<div class="h-8" />
				<div
					class="fontsemibold text-sky-50 text-lg text-center"
				>
					Thinking...
				</div>
			{/if}
			{#if error}
				<div class="h-8" />
				<div
					class="fontsemibold text-lg text-center text-red-500"
				>
					Woops! {error}
				</div>
			{/if}
			{#if recommendations}
				{#each recommendations as recommendation, i (i)}
					<div>
						{#if recommendation !== ''}
							<div class="mb-8">
								{#if typeof recommendation !== 'string' && recommendation.title}
									<RecommendationCard {recommendation} />
								{:else}
									<div in:fade>
										<LoadingCard
											incomingStream={recommendation}
										/>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>
