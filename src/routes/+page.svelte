<script>
	import { categories } from '../const/categories';



</script>




<secion>
<h1 class="text-center font-extrabold text-black text-3xl md:text-5xl mb-10 tracking-tight">What to read</h1>
<h3 class="text-center text-black text-1xl md:text-2xl">You don't know what to read?</h3>
<h2 class="text-center font-semibold text-black text-2xl md:text-4xl">Great, let <span class="font-extrabold text-green-700">AI</span> help you</h2>
</secion>

<div class="h-24"/>
<section>
	<h3 class="font-semibold text-xl md:text-l">Select all categories you think you want your book to include</h3>
<div>
{#each categories as category (category)}
	<label class="inline-flex items-center p-1">
		<input type="checkbox" class="form-checkbox h-3 w-3" value={category}>
		<span class="ml-2">{category}</span>
	</label>
{/each}
</div>

</section>