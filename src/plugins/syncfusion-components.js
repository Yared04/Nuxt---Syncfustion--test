import {
  TreeViewPlugin,
  ContextMenuComponent,
} from "@syncfusion/ej2-vue-navigations";
import { defineNuxtPlugin } from "#app";
import {
  RichTextEditorPlugin,
  RichTextEditor,
  Toolbar,
  Image,
  Link,
  HtmlEditor,
} from "@syncfusion/ej2-vue-richtexteditor";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TreeViewPlugin);
  nuxtApp.vueApp.component("EjsContextmenu", ContextMenuComponent);
  nuxtApp.vueApp.use(RichTextEditorPlugin);
  RichTextEditor.Inject(Toolbar, Image, Link, HtmlEditor);
});
