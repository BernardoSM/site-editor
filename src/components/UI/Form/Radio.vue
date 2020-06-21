<template>
    <div class="checkbox">
        <div class="box" :class="{active: value}">
            <img src="@/assets/check.png" alt="Check">
        </div>
        <label v-html="nome"></label>
    </div>
</template>

<script>
import '@/styles/_forms.scss'

export default {
    props: {
        value: {
            type: Boolean,
            required: true
        },
        nome: {
            type: String
        }
    }
}
</script>

<style scoped lang="scss">

    .checkbox {
        text-align: left;
        margin-bottom: 12px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;

        .box {
            background: $grey-secondary;
            transition: 0.2s;
            width: 23px;
            height: 23px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 16px;
            border-radius: 12px;

            &.active {
                background: $blue-primary;
                transition: 0.2s;

                img {
                    display: block;
                }
            }

            img {
                display: none;
                width: 13px;
                height: auto;
                display: none;
            }
        }

        label {
            font-family: $font;
            font-weight: $semibold;
            font-size: 14px;
            color: $grey-primary;
            display: flex;
            cursor: pointer;

            ::v-deep img {
                margin-left: 8px;
                display: block;
                height: 20px;
                width: auto;
            }
        }
    }
    
</style>
