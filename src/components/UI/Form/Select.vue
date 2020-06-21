<template>
    <div class="select" :class="{active}">
    	<div v-if="error" class="box-error"></div>
        <label>{{nome}}</label>
		<slot></slot>
    </div>
</template>

<script>
import '@/styles/_forms.scss'

export default {
    props: ['nome', 'active', 'error'],
    data() {
        return {
            focused: false
        }
    }
}
</script>

<style scoped lang="scss">
	.select {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-family: $font;
		height: 53px;
		width: 100%;
		position: relative;
		transition: 0.2s;
		margin-bottom: 16px;
		border-radius: 5px;

		&.active {
			transition: 0.2s;

			label {
				font-size: 11px;
	            top: 5px;
	            left: 5px;
			}
		}

        .box-error {
			border-radius: 5px;
			width: 100%;
			height: 100%;
			border: 2px solid $red;
			position: absolute;
			top: 0;
			left: 0;
			pointer-events: none;
		}

		label {
			position: absolute;
			top: 19.5px;
			left: 15px;
			font-style: normal;
			font-weight: $semibold;
			font-size: 14px;
			line-height: 15px;
			color: $grey-primary;
			text-transform: uppercase;
			transition: 0.2s;
			pointer-events: none;

			@media (max-width: 374px) {
				font-size: 12px;
			}
		}
	}
    
</style>
