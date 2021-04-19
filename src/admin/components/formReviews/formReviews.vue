<template lang="pug">
    .form-reviews-component
        form.form(@submit.prevent="handleSubmit")
            card(title="Новый отзыв" slot="content")
                .form-container(slot="content")
                    .form-data
                        .upload-image
                            label(
                                :style="{backgroundImage: `url(${newReview.preview})`}"
                                :class="[ 'uploader', {active: newReview.preview}, { hovered: hovered }]"
                                @dragover="handleDragOver"
                                @dragleave="hovered = false"
                                @drop="handleChange"
                            )
                            .uploader-btn
                                appButton(
                                    plain
                                    title="Добавить фото"
                                    typeAttr="file" 
                                    @change="handleChange"
                                )
                        .form-inputs
                            .form-row-inputs
                                appInput(
                                    title="Имя автора" 
                                    v-model="newReview.author"
                                )
                                appInput(
                                    title="Титул автора" 
                                    v-model="newReview.occ"
                                )
                            .form-row
                                appInput(
                                    title="Отзыв" 
                                    field-type="textarea" 
                                    v-model="newReview.text"
                                )
                    .form-buttons
                        appButton.cancel-btn(title="Отмена" plain)
                        appButton(title="Сохранить")
</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import { mapActions } from "vuex";
export default {
    components: { 
        card, 
        appButton, 
        appInput
    },
    props: {
        currentReview: {
            type: Object | null,
            default: null
        }
    },
    data() {
        return {
            hovered: false,
            newReview: {
                author: "",
                occ: "",
                text: "",
                photo: {},
                preview: "",
            },
        };
    },
    watch: {
        currentReview() {
            this.setReview();
        }
    },
    created() {
        this.setReview();
    },
    methods: {
            ...mapActions({
            addNewReview: "reviews/add",
            editReview: "reviews/edit",
            showTooltip: "tooltips/show"
        }),
        setReview() {
            if(this.currentReview) {
                this.newReview = { ...this.currentReview };
            } else {
                this.newReview = {
                author: "",
                occ: "",
                text: "",
                photo: {},
                preview: "",
            }
            }
        },
        handleDragOver(e) {
            e.preventDefault();
            this.hovered = true;
        },
        async createReview() {
            try {
                await this.addNewReview(this.newReview);
                this.showTooltip({
                    text: "Отзыв успешно добавлен",
                    type: "success"
                });
                this.newReview.author = "";
                this.newReview.occ = "";
                this.newReview.text = "";
                this.newReview.photo = {};
                this.newReview.preview = "";
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        async updateReview(review) {
            await this.editReview(review);
        },
        async handleSubmit() {
            if(!this.newReview.id) {
                this.createReview();
            } else {
                this.updateReview(this.newReview);
            }
        },
        handleChange(event) {
            event.preventDefault();
            const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

            this.newReview.photo = file;
            this.renderPhoto(file);
            this.hovered = false;
        },
        renderPhoto(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.newReview.preview = reader.result;
            };

            reader.onerror = () => {
                console.log('error');
            };
            reader.onabort = () => {
                console.log('abort');
            };
        },
    },
};
</script>

<style lang="postcss" scoped>
.form-data {
  display: flex;
  padding: 0 33px;
}

.form-col {
  width: 50%;
  margin-right: 30px;

  &:last-child {
    margin-right: 0;
  }
}

.upload-image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 30px;
}

.uploader {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    background: #dee4ed;
    border: 1px dashed #a1a1a1;
    position: relative;
    background-size: cover;
    margin-bottom: 30px;

    &.hovered {
        border-color: blue;
    }
}

.form-inputs {
    flex-grow: 1;
}

.form-row-inputs {
    display: flex;
    justify-content: space-between;
}

.form-row,
.form-row-inputs {
  margin-bottom: 30px;
}

.input {
    width: 48%;
}

.form-buttons {
    display: flex;
    justify-content: flex-end;
    padding-right: 33px;

    &.cancel {
        color: $dark-grey;
    }
}

.btn {
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
}

.form-buttons .cancel-btn.default-btn-container {
    color: $dark-grey;
}
</style>