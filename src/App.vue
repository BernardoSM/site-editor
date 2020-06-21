<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	import '@/styles/_font.scss'
	import '@/styles/_animations.scss'
	import '@/styles/_forms.scss'

	export default {
		
	}
</script>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
}

#app {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
