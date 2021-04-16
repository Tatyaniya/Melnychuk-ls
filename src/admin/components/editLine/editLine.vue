<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorMessage="validation.firstError('title')"
          v-model="title"
          @input="$emit('input', $event)"
          @keydown.native.enter="$emit('approve')"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="$emit('approve', title)"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove', $event)"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Validator} from 'simple-vue-validator';

export default {
    mixin: [require('simple-vue-validator').mixin],
    validators: {
        "title": (value) => {
            return Validator.value(value).required('Заполните поле');
        }
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        errorText: {
            type: String,
            default: ""
        },
        blocked: Boolean,
        editModeByDefault: Boolean
    },
    data() {
        return {
            editmode: this.editModeByDefault,
            title: this.value,
        };
    },
    methods: {
        onApprove() {
            this.$validate().then(success => {
                if (!success) {
                    return;
                } else if (this.title.trim() === this.value.trim()) {
                    this.editmode = false;
                } else {
                    this.$emit("approve", this.value);
                }
            })          
        }
    },
    components: {
        icon: () => import("components/icon"),
        appInput: () => import("components/input")
    }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>