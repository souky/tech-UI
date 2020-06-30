import zsDialogComponents from './zsDialog.vue'

const zsDialog = {
    install:function(Vue){
        Vue.component('zsDialog',zsDialogComponents)
    }
};

export default zsDialog;
