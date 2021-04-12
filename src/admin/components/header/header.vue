<template lang="pug">
    .header-component
        headline(
            title="Панель администрирования"
            @logout="$emit('logout')"
        )
            user
        navigation
</template>

<script>
import headline from "../../components/headline";
import user from "../../components/user";
import navigation from "../../components/navigation";


export default {
    components: { 
        headline,
        user,
        navigation        
    },
    methods: {
        createSkill() {
            this.addSkillAction();
        },
    }
};
</script>