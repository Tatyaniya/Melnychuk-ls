<template lang="pug">
    nav.navigation-component
        .container
            ul.list
                li.item(v-for="link in links" :key="link.id")
                    router-link.link(:to="link.alias" exact active-class="active") {{link.title}}
</template>

<script>
const links = [
  {id: 0, title: "Обо мне", alias: "/"},
  {id: 1, title: "Работы", alias: "/works"},
  {id: 2, title: "Отзывы", alias: "/reviews"},
];

export default {
    data() {
        return {
            links
        }
    }
};

</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>