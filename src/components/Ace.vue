<template>
  <div :id="id" class="ace">{{ content }}</div>
</template>

<script>
import ace from "ace-builds";
import "ace-builds/webpack-resolver"; // 在 webpack 环境中使用必须要导入
import "ace-builds/src-noconflict/theme-monokai"; // 默认设置的主题
import "ace-builds/src-noconflict/mode-javascript"; // 默认设置的语言模式
import "ace-builds/src-noconflict/mode-json"; // 默认设置的语言模式
import "ace-builds/src-noconflict/ext-beautify"; //
export default {
  name: "Ace",
  props: {
    mode: {
      type: String,
      default: () => "json",
    },
    content: {
      type: String,
      default: () => "{}",
    },
  },
  data() {
    return {
      id: Math.floor(Math.random() * 10000) + "",
      editor: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.editor = ace.edit(this.id, {
        showLineNumbers: false,
        fontSize: 12, // 编辑器内字体大小
        theme: "ace/theme/monokai", // 默认设置的主题
        mode: `ace/mode/${this.mode}`, // 默认设置的语言模式
        tabSize: 2, // 制表符设置为 4 个空格大小
        readOnly: false,
        highlightActiveLine: false,
      });
      const beautify = ace.require("ace/ext/beautify");
      beautify.beautify(this.editor.session);
      this.editor.on("blur", () => {
        this.$emit("update:content", this.editor.session.getValue());
      });
    },
  },
};
</script>

<style lang="scss">
.ace {
  width: 100%;
  height: 200px;
}
</style>