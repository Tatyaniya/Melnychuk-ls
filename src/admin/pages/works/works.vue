<template lang="pug">
    .works-page-component
        .page-content
            .container
                .header
                    .title Блок "{{this.$route.meta.title}}"
                
                ul.cards
                    li.li-form(v-if="emptyCardIsShown")
                        formWorks(
                            :currentWork="currentWork"
                            @close="closeHandler"
                            )
                    li.item.empty-work(v-else)
                        squareBtn(
                            type="square"
                            v-if="emptyCardIsShown == false"
                            @click="emptyCardIsShown = true"
                            title="Добавить работу"
                        )
                    li.item(v-for="work in works" :key="work.id")
                        workCard(
                            :work="work"
                            @edit="edit"
                            @remove="remove"
                        )
</template>

<script>
import formWorks from "../../components/formWorks";
import workCard from "../../components/workCard";
import squareBtn from "../../components/button/button";
import { mapState, mapActions } from "vuex";

export default {
    components: { 
        formWorks, 
        workCard,
        squareBtn
    },
    data() {
        return {
            emptyCardIsShown: false,
            currentWork: null
        }
    },
    computed: {
        ...mapState("works", {
            works: (state) => state.works,
        }),
        
    },
    methods: {
        ...mapActions({
            getWorks: "works/get",
            removeWork: "works/remove",
            editWork: "works/edit",
            showTooltip: "tooltips/show"
        }),
        async remove(currentWork) {
            try {
                await this.removeWork(currentWork.id);
                this.showTooltip({
                    text: "Работа успешно удалена",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        edit(currentWork) {
            this.currentWork = { ...currentWork };
            this.emptyCardIsShown = true;
        },
        closeHandler(){
            this.emptyCardIsShown = false;
        }
    },
    watch: {
        emptyCardIsShown(){
            if(!this.emptyCardIsShown){
                this.currentWork = null
            }
        }
    },
    mounted() {
        this.getWorks();
    }

}
</script>

<style scoped lang="postcss">
.page-content {
  padding: 60px 0 20px;
  background: url("../../../images/bg/admin.jpg") center center / cover no-repeat;
  flex: 1;
}

.header {
  margin-bottom: 60px;
}

.title {
  font-size: 21px;
  font-weight: bold;
  color: $text-dark;
}

.li-form {
    width: 100%;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    margin-left: -20px;
}

.item {
    width: calc(100% / 3 - 20px);
    margin-left: 20px;
}
</style>