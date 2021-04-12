export default {
    namespaced: true,
    state: {
        isShown: false,
        text: "",
        type: "success"
    },
    mutations: {
        SET_TOOLTIP(state, tooltip) {
            state.isShown = tooltip.isShown;
            state.text = tooltip.text;
            state.type = tooltip.type;
        }
    },
    actions: {
        show(state, tooltip) {
            let timeout = null;

            state.commit('SET_TOOLTIP', {
                isShown: true,
                text: tooltip.text,
                type: tooltip.type
            });

            if(timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                state.dispatch('hide');
            }, 2500);
        },
        hide({commit, state}) {
            commit("SET_TOOLTIP", {
              ...state,
              isShown: false
            });
        }
    }
}