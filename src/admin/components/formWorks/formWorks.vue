<template>
    <div class="form-component">
        <form class="form" @submit.prevent="handleSubmit">
        <card title="Добавление работы">
            <div class="form-container" slot="content">
            <div class="form-cols">
                <div class="form-col">
                    <app-input class="input-message"
                        :error-message="validation.firstError('newWork.preview')"
                    ></app-input>
                    <label
                        :error-message="validation.firstError('newWork.preview')"
                        :style="{backgroundImage: `url(${newWork.preview})`}"
                        :class="[ 'uploader', {active: newWork.preview}, {
                        hovered: hovered
                        }]"
                        @dragover="handleDragOver"
                        @dragleave="hovered = false"
                        @drop="handleChange"
                    >
                        <div class="uploader-title">Перетащите или загрузите картинку</div>
                        <div class="uploader-btn">
                        <app-button typeAttr="file" @change="handleChange" :error-message="validation.firstError('newWork.preview')"></app-button>
                        </div>
                    </label>
                </div>
                <div class="form-col">
                <div class="form-row">
                    <app-input v-model="newWork.title" title="Название" :error-message="validation.firstError('newWork.title')"/>
                </div>
                <div class="form-row">
                    <app-input v-model="newWork.link" title="Ссылка" :error-message="validation.firstError('newWork.link')"/>
                </div>
                <div class="form-row">
                    <app-input v-model="newWork.description" field-type="textarea" title="Описание" :error-message="validation.firstError('newWork.description')"/>
                </div>
                <div class="form-row">
                    <tags-adder v-model="newWork.techs" :error-message="validation.firstError('newWork.techs')" />
                </div>
                </div>
            </div>
            <div class="form-btns">
                <div class="btn cancel">
                <app-button title="Отмена" typeAttrs="button" @click="$emit('close', $event)" plain></app-button>
                </div>
                <div class="btn">
                <app-button title="Сохранить" :disabled="isSubmitDisabled"></app-button>
                </div>
            </div>
            </div>
        </card>
        </form>
    </div>
</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import { mapActions, mapState } from "vuex";
import {Validator} from 'simple-vue-validator';

export default {
    components: { 
        card, 
        appButton, 
        appInput, 
        tagsAdder 
    },
    props: {
        emptyCardIsShown: true,
        currentWork: {
            type: Object | null,
            default: null
        }
    },
    mixin: [require('simple-vue-validator').mixin],
    validators: {
        "newWork.title": value => {
            return Validator.value(value)
                .maxLength(30)
                .required("Введите название");
        },
        "newWork.link": value => {
            return Validator.value(value)
                .url("Введите корректный url")
                .required("Введите ссылку");
        },
        "newWork.description": value => {
            return Validator.value(value).required("Введите описание");
        },
        "newWork.techs": value => {
            return Validator.value(value).required("Введите теги");
        },
        "newWork.preview": value => {
            return Validator.value(value).required("Загрузите картинку");
        }
    },
    data() {
        return {
            hovered: false,
            isSubmitDisabled: false,
            newWork: {
                title: "",
                link: "",
                description: "",
                techs: "",
                photo: {},
                preview: "",
            },
        };
    },
    watch: {
        currentWork() {
            this.setWork();
        }
    },
    created() {
        this.setWork();
    },
    computed: {
        ...mapState("works", {
        works: (state) => state.works,
        }),
    },
    methods: {
            ...mapActions({
            addNewWork: "works/add",
            editWork: "works/edit",
            showTooltip: "tooltips/show"
        }),
        handleDragOver(e) {
            e.preventDefault();
            this.hovered = true;
        },
        setWork() {
            if(this.currentWork) {
                this.newWork = { ...this.currentWork };
            } else {
                this.newWork = {
                    title: "",
                    link: "",
                    description: "",
                    techs: "",
                    photo: {},
                    preview: "",
                }
            }
        },
        async handleSubmit() {
            if(await this.$validate()) {
                if(!this.newWork.id) {
                    try {
                        await this.addNewWork(this.newWork);
                        this.showTooltip({
                            text: "Работа успешно добавлена",
                            type: "success"
                        });
                        this.$emit('close');
                    } catch (error) {
                        this.showTooltip({
                            text: "Произошла ошибка",
                            type: "error"
                        })
                    }
                } else {
                    try {
                        await this.editWork(this.newWork);                        
                        this.showTooltip({
                            text: "Работа успешно изменена",
                            type: "success"
                        });
                        this.$emit('close');
                    } catch (error) {
                        this.showTooltip({
                            text: "Произошла ошибка",
                            type: "error"
                        })
                    }
                }
            }
        },
        handleChange(event) {
            event.preventDefault();
            const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

            this.newWork.photo = file;
            this.renderPhoto(file);
            this.hovered = false;
        },
        renderPhoto(file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    this.newWork.preview = reader.result;
                };

                reader.onerror = () => {
                    this.showTooltip({
                        text: 'произошла ошибка',
                        type: "error"
                    });
                };
                reader.onabort = () => {
                    this.showTooltip({
                        text: 'произошла ошибка',
                        type: "error"
                    });
                };
        },
    },
};
</script>

<style src="./formWorks.pcss" lang="postcss" scoped></style>