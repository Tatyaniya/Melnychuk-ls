<template lang="pug">
    card(slim)
        editLine(slot="title" v-model="title")
       
</template>

<script>
import card from "../card";
import editLine from "../editLine";

export default {
    сomponents: {
        card,
        editLine
    },
    data() {
        return {
            title: "Title"
        }
    }
};

</script>

<style lang="postcss">
/* color: $text-dark;
  background: #fff; */
</style>