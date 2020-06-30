<template >
  <div class="ueEdit">
    <quill-editor :disabled="disabled" v-model="content" ref="myQuillEditor" :options="editorOption" @focus="focusUe" @change="onEditorChange($event)">
      <div :id="toolbar" class="toolbar-vue" slot="toolbar">
        <button class="ql-bold" title="加粗">Bold</button>
        <select class="ql-header" title="段落格式">
            <option selected>正文</option>
            <option value="2">标题1</option>
            <option value="3">标题2</option>
            <option value="4">标题3</option>
        </select>
        <button class="ql-list" value="ordered" title="有序列表"></button>
        <button class="ql-list" value="bullet" title="无序列表"></button>
        <button class="ql-code-block" value="code-block"></button>
        <select class="ql-color" value="color" title="字体颜色"></select>
        <span class="ql-icon el-icon-picture" title="图片" @click="insertImgClick"></span>  <!-- 插入图片 -->
        <input style="display: none;" type="file" id="insertImage" @change="fileInsert($event)">  <!-- 选择图片input -->
      </div>
    </quill-editor>
    <div v-if="disabled" class="ue-mask"></div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import './index.scss'
import * as Quill from 'quill'; // 富文本基于quill

export default {
  name:'ueEdit',
  model:{
    prop:'values',
    event:'updateValue'
  },
  props:{
    values:String,
    disabled:{
      type:Boolean,
      default:false
    },

  },
  data(){
    return {
      editor:null,
      content:'',
      toolbar:'toolbar_',
      isLoading:false,
      editorOption: { //  富文本编辑器配置
        modules: {
            toolbar: '#toolbar_'
        },
        theme: 'snow',
        placeholder: '请输入正文'
      }
    }
  },
  components: {
    quillEditor
  },
  created:function(){
    let timeId = 'toolbar_' + this.$getUUID(true)
    this.toolbar = timeId
    this.editorOption.modules.toolbar = '#' + timeId
  },
  mounted:function(){
    this.editor = this.$refs.myQuillEditor.quill;
  },
  watch:{
    values:{
      handler(val,old){
        if(val && val != old) {
          this.$set(this,'content',this.values)
        }
      }
    }
  },
  methods:{
    insertImgClick(){
      if(!this.disabled) this.$el.querySelector("#insertImage").click()
    },
    onEditorChange(){
      this.$emit('updateValue', this.content)
      this.$refs.myQuillEditor.quill.enable(this.isLoading);
      if(!this.isLoading) {
        this.isLoading = true
      }
    },
    focusUe(){
      this.isLoading = true
      this.$refs.myQuillEditor.quill.enable(this.isLoading && !this.disabled);
    },
    fileInsert (e) {
      var oFile = e.target.files[0];
      if (typeof (oFile) === 'undefined') {
          return;
      }
      let sExtensionName = oFile.name.substring(oFile.name.lastIndexOf('.') + 1).toLowerCase();   // 文件扩展名
      let sfileType = 'image'; // 上传文件类型
      if (sExtensionName !== 'png' && sExtensionName !== 'jpg' && sExtensionName !== 'jpeg') {
          this.$notify_warning('不支持该类型图片');
          return;
      }
      if(oFile.size > 1024*1024*10){
        this.$notify_warning('图片大小需在10M以内')
        return
      }
      let formData = new FormData(); // 通过formdata上传
      formData.append('uploadFiles', oFile);
      formData.append('taskId',"");
      formData.append('configId',"9595959595995");
      formData.append('dataId',"asdwccc2222");
      formData.append('businessCode',"1232123sss");


      let url = 'ZS_Base/fileAppend/uploadFiles';
      const loading = this.$loading({
        lock: true,
        text: '上传文件中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      this.$axios.post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
          this.editor.insertEmbed(this.editor.selection.savedRange.index, sfileType, 'ZS_Base/image/getImage?uuid='+res.data.result);  // 这个方法用来手动插入dom到编辑器里
          this.editor.setSelection(this.editor.selection.savedRange.index + 1);  // 这个方法可以获取光标位置
          loading.close()
      }).catch((response) => {
          this.$notify_error(response.data.message)
          loading.close()
      })
    },
  }
}
</script>
