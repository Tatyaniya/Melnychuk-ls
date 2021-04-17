<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Добавление работы">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
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
                  <app-button typeAttr="file" @change="handleChange"></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input v-model="newWork.title" title="Название" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.link" title="Ссылка" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.description" field-type="textarea" title="Описание" />
              </div>
              <div class="form-row">
                <tags-adder v-model="newWork.techs" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn cancel">
              <app-button title="Отмена" plain></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить"></app-button>
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
import { mapActions } from "vuex";
export default {
    components: { 
        card, 
        appButton, 
        appInput, 
        tagsAdder 
    },
    props: {
        currentWork: {
            type: Object | null,
            default: null
        }
    },
    data() {
        return {
            hovered: false,
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
        async createWork() {
            try {
                await this.addNewWork(this.newWork);
                this.showTooltip({
                    text: "Работа успешно добавлена",
                    type: "success"
                });
                this.newWork.title = "";
                this.newWork.link = "";
                this.newWork.description = "";
                this.newWork.techs = "";
                this.newWork.photo = {};
                this.newWork.preview = "";
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        async updateWork(currentWork) {
            try {
                await this.editWork(currentWork);
                this.showTooltip({
                    text: "Работа успешно изменена",
                    type: "success"
                });
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        handleSubmit() {
            if(!this.newWork.id) {
                this.createWork();
            } else {
                this.updateWork(this.currentWork);
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
                console.log('error');
            };
            reader.onabort = () => {
                console.log('abort');
            };
        },
    },
};
</script>

<style src="./formWorks.pcss" lang="postcss" scoped></style>