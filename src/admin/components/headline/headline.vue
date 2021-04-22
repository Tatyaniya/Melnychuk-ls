<template lang="pug">
    .headline-component
        .container.headline-container
            slot
            .title {{title}}
            .buttons
                button.btn(
                    type="button"
                    @click="logout"
                ) Выйти
</template>

<script>
export default {
    props: {
        title: {
        type: String,
        default: "Панель администрирования"
        }
    },
    methods: {
        logout() {
            this.$emit('logout');
        }
    }
}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>