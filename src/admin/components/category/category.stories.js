import category from "./category";
import { action } from "@storybook/addon-actions";

export default {
    title: "category",
    components: {category}
}

export const defaultView = () => ({
    components: {category},
    template: `
      <category /> 
    `
  });