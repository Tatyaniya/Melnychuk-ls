<template lang="pug">
    card(slim)
        editLine(slot="title" v-model="title" :editModeByDefault="empty")
        template(slot="content")
            ul.skills
                li.item(v-for="skill in skills" :key="skill.id" v-if="empty === false")
                    skill(:skill="skill")
            .bottom-line
                skillAddLine(:blocked="empty")
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAddLine from "../skillAddLine";

const skills = [
    {id: 0, title: "HTML", percent: 80},
    {id: 1, title: "CSS", percent: 60},
    {id: 2, title: "JavaScript", percent: 40},
]

export default {
    components: {
        card,
        editLine,
        skill,
        skillAddLine
    },
    props: {
        empty: Boolean
    },
    data() {
        return {
            title: "",
            skills
        }
    }
}

</script>

<style lang="postcss">
    .item {
        margin-bottom: 30px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .bottom-line {
        padding-top: 70px;
        margin-top: auto;
        padding-left: 25%;
    }
</style>
