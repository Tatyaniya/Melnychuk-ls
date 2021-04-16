<template lang="pug">
    .works-page-component
        .page-content
            .container
                .header
                    .title Блок "{{this.$route.meta.title}}"
                .form
                    appForm
                ul.cards
                    li.item(v-for="work in works" :key="work.id")
                        workCard(
                            :work="work"
                            @edit="edit"
                            @remove="remove"
                        )
</template>

<script>
import appForm from "../../components/form";
import workCard from "../../components/workCard";
import { mapState, mapActions } from "vuex";

export default {
    components: { 
        appForm, 
        workCard 
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
        remove(currentWork) {
            try {
                this.removeWork(currentWork.id);
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
            try {
                this.editWork(currentWork);
                this.showTooltip({
                    text: "Работа успешно изменена",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
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

.cards {
    display: flex;
    flex-wrap: wrap;
    margin-left: -20px;
}

.item {
    width: calc(100% / 3 - 20px);
    margin-left: 20px;
}

.form {
    margin-bottom: 30px;
}
</style>