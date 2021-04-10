import category from "./category";
import { action } from "@storybook/addon-actions";

const methods = {
    onRemove: action("onRemove"),
    onRemoveSkill: action("onRemoveSkill"),
    onEditSkill: action("onEditSkill")
}

export default {
    title: "category",
    components: {
        category
    }
}

const skills = [
    {id: 0, title: "HTML", percent: 90},
    {id: 1, title: "CSS", percent: 80}
]

export const defaultView = () => ({
    components: {category},
    data() {
        return {
            title: "Frontend",
            skills
        }
    },
    template: `
        <category
            :title="title"
            :skills="skills"
            @remove="onRemove"
            @removeSkill="onRemoveSkill"
            @editSkill="onEditSkill"
        /> 
    `,
    methods
});