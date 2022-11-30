<script lang='ts'>
import { defineComponent, ref } from 'vue'
import useMonaco from '~/composables/useMonaco'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    language: {
      type: String,
      default: 'json',
    },
    preComment: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    editorOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { updateVal, getEditor, createEditor, onFormatDoc } = useMonaco(props.language)
    const isFull = ref(false)
    return {
      isFull,
      updateVal,
      getEditor,
      createEditor,
      onFormatDoc,
    }
  },
  watch: {
    modelValue(val) {
      val !== this.getEditor()?.getValue() && this.updateMonacoVal(val)
    },
  },
  mounted() {
    if (this.$el) {
      const monacoEditor = this.createEditor(this.$el, this.$props.editorOptions)
      this.updateMonacoVal()
      monacoEditor!.onDidChangeModelContent(() => {
        this.$emit('update:modelValue', monacoEditor!.getValue())
      })
      monacoEditor!.onDidBlurEditorText(() => {
        this.$emit('blur')
      })
    }
  },
  methods: {
    updateMonacoVal(_val?: string) {
      const { modelValue, preComment } = this.$props
      const val = preComment ? `${preComment}\n${_val || modelValue}` : (_val || modelValue)
      this.updateVal(val)
    },
  },
})
</script>

<template>
  <div class="editor-area" :class="isFull ? 'full' : ''" :style="{ width, height }" />
</template>

<style lang="css" scoped>
.editor-area {
  position: relative;
  box-sizing: border-box;
}
</style>
