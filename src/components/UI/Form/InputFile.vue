<template>
    <label :for="fileType" class="input-file" :class="{selected, error, sended}">
        <slot v-if="!sended"></slot>
        <span class="label">{{ labelText }}</span>
        <div class="input">
            <div class="img">
                <font-awesome-icon :icon="['fas', inputImage]" />
            </div>
        </div>
        <span class="name"> {{ fileName }} </span>
    </label>
</template>

<script>
import '@/styles/_forms.scss'

export default {
    props: ['fileType', 'selected', 'fileName', 'placeholder', 'error', 'inputImage', 'sended'],
    data() {
        return {
            focused: false
        }
    },
    computed: {
        imageName() {
            return this.selected ? 'file-icon-green' : 'file-icon-gray'
        },
        labelText() {
            return this.selected ? this.placeholder + ' enviado' : 'Enviar ' + this.placeholder
        }
    }
}
</script>

<style scoped lang="scss">

    .input-file {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-family: $font;
            height: auto;
            width: 100%;
            position: relative;
            transition: 0.2s;
            cursor: pointer;

            &.sended {
                cursor: auto;

                .label {
                    color: $green;
                }

                .input {
                    background: #BED6C8;
                    border: 2px solid #BED6C8;
                    cursor: auto;

                    .img {

                        svg {
                            color: $green;
                        }
                    }
                }

                .hide {
                    display: none;
                }
            }

            &.selected {

                .label {
                    font-size: 11px;
                    top: 3px;
                    left: 5px;
                }
            }

            &.error {
            
                .input {
                    border: 2px solid $red;
                }
            }

            .hide {
                height: 53px;
                width: 100%;
                position: absolute;
                opacity: 0;
                top: 0;
                left: 0;
                cursor: pointer;
                pointer-events: none;
            }

            .label {
                position: absolute;
                top: 19.5px;
                left: 15px;
                font-style: normal;
                font-weight: $semibold;
                font-size: 12px;
                line-height: 15px;
                color: $grey-primary;
                text-transform: uppercase;
                transition: 0.2s;
                pointer-events: none;

                @media (max-width: 374px) {
                    font-size: 10px;
                }
            }

            .input {
                -webkit-appearance: none;
                display: block;
                width: 100%;
                height: 53px;
                font-family: $font;
                font-style: normal;
                font-weight: $semibold;
                font-size: 14px;
                line-height: 15px;
                color: $black;
                outline: none;
                border-radius: 5px;
                padding-top: 23px;
                padding-left: 3px;
                padding-right: 3px;
                background: $grey-secondary;
                border: 2px solid $grey-secondary;
                box-sizing: border-box;
                resize: none;
                cursor: pointer;

                .img {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 53px;
                    height: 53px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    svg {
                        font-size: 20px;
                        color: $grey-primary;
                    }
                }
            }

            .name {
                position: absolute;
                top: 28px;
                left: 5px;
                font-family: $font;
                font-style: normal;
                font-weight: $semibold;
                font-size: 13px;
                line-height: 15px;
                color: $black;
                max-width: 270px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    
</style>
