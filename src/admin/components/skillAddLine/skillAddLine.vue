<template lang="pug">
    .skill-add-line-component(:class="{blocked: blocked}")
        .title
            app-input(
                placeholder="Новый навык"
                v-model="skill.title"
            )
        .percent
            app-input(
                type="number" min="0" max="100" maxlength="3"
                v-model="skill.percent"
            )
        .button
            round-button(
                type="round"
                @click="handleClick"
            )
</template>

<script>
import input from "../input";
import button from "../button";

export default {
    props: {
        blocked: Boolean
    },
    components: {
        appInput: input,
        roundButton: button,
    },
    data() {
        return {
            skill: {
                title: "",
                percent: ""
            }
        }
    },
    methods: {
        handleClick() {
            this.$emit('approve', this.skill);
        }
    }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>