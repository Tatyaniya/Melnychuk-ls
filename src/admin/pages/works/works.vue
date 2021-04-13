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
            getWorks: "works/get"
        }),
    },
    mounted() {
        this.getWorks();
    }

}
</script>

<style scoped lang="postcss">
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