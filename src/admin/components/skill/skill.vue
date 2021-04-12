<template lang="pug">
    .skill-component(v-if="currentSkill.editmode === false")
        .title {{skill.title}}
        .percent {{skill.percent}}
        .buttons
            icon.btn(symbol="pencil" grayscale @click="currentSkill.editmode = true")
            icon.btn(symbol="trash" grayscale @click="$emit('remove', currentSkill)")

    .skill-component(v-else)
        .title
            app-input(noSidePaddings  v-model="currentSkill.title")
        .percent
            app-input(type="number" min="0" max="100" maxlength="3" v-model="currentSkill.percent")
        .buttons
            icon.btn(symbol="tick" @click="$emit('approve', currentSkill)")
            icon.btn(symbol="cross" @click="currentSkill.editmode = false")
</template>

<script>
import input from "../input";
import icon from "../icon";

export default {
    props: {
        skill: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    data() {
        return {
            currentSkill: {
                id: this.skill.id,
                title: this.skill.title,
                percent: this.skill.percent,
                category: this.skill.category,
                editmode: false
            }
        }
    },
    components: {
        icon,
        appInput: input
    }
    
}

</script>

<style lang="postcss" src="./skill.pcss" scoped></style>