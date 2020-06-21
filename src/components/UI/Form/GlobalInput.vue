<template>
    <div class="global-input" :class="{focus: selectActive, error: error}">
        <slot></slot>
        <label>{{ nome }}</label>
    </div>
</template>

<script>
import '@/styles/_forms.scss'

export default {
    props: ['nome', 'selectActive', 'error'],
    data() {
        return {
            focused: false
        }
    }
}
</script>

<style scoped lang="scss">
    .global-input {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-family: $font;
        height: 53px;
        width: 100%;
        position: relative;
        transition: 0.2s;

        &.focus {
            
            label {
                font-size: 11px;
                top: 3px;
                left: 5px;
            }

            textarea {
                font-size: 11px;
                top: 3px;
                left: 5px;
            }
        }

        &.error {
            
            input, textarea, select {
                border: 2px solid $white;
            }
        }

        label {
            position: absolute;
            top: 19.5px;
            left: 15px;
            font-style: normal;
            font-weight: $bold;
            font-size: 14px;
            line-height: 15px;
            color: $gray;
            text-transform: uppercase;
            transition: 0.2s;
            pointer-events: none;

            @media (max-width: 374px) {
                font-size: 12px;
            }
        }

        textarea {
            min-height: 240px;
        }

        input, textarea, select {
            -webkit-appearance: none;
            display: block;
            width: 100%;
            height: 53px;
            font-family: $font;
            font-style: normal;
            font-weight: $bold;
            font-size: 14px;
            line-height: 15px;
            color: $gray;
            outline: none;
            border-radius: 5px;
            padding-top: 23px;
            padding-left: 3px;
            padding-right: 3px;
            background: $white-dark;
            border: 2px solid $white-dark;
            box-sizing: border-box;
            resize: none;

            &:disabled {
                color: $gray;
            }
        }

        input:focus {
            background: $white;
            border: 2px solid $gray;
        }

        input:focus ~ label {
            font-size: 11px;
            top: 5px;
            left: 5px;
        }

        input:focus ~ svg {
            transition: 0.2s;
            font-size: 14px;
            top: 5px;
            right: 5px;
        }

        input:not(:placeholder-shown) ~ label {
            font-size: 11px;
            top: 5px;
            left: 5px;
        }

        textarea:focus {
            background: $white;
            border: 2px solid $gray;
        }

        textarea:focus ~ label {
            font-size: 11px;
            top: 5px;
            left: 5px;
        }

        textarea:not(:placeholder-shown) ~ label {
            font-size: 11px;
            top: 5px;
            left: 5px;
        }
        
        svg {
            transition: 0.2s;
            font-size: 18px;
            position: absolute;
            top: 14px;
            right: 14px;
            color: $gray;
        }
    }

    

    
</style>
