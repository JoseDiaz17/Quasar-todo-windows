<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input label="Buscar..." filled v-model="filtro" />
    <!-- Editor -->
    <q-editor
      v-if="!modoEdicion"
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Presioneme para guardar',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [ 'save']
      ]"
    />
    <!-- Editor para editar -->
    <q-editor
      v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Presioneme para actualizar',
          icon: 'save',
          label: 'Actualizar',
          handler: updateWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [ 'save']
      ]"
    />
    <!-- Donde se pinta -->
    <q-card flat bordered class="row justify-between" v-for="(item, index) in arrayFiltrado" :key="index">
      <q-card-section v-html="item.texto" class="col" :class="item.estado ? 'tachar' : ''"></q-card-section>
      <q-btn flat color="yellow" @click="editar(index, item.id)">Editar</q-btn>
      <q-btn flat color="red" @click="eliminar(index, item.id)">Eliminar</q-btn>
      <q-space />
    </q-card>
    <div v-if="arrayFiltrado.length == 0" class="flex flex-center">
      <p class="text-h6">Sin notas</p>
    </div>
  </div>
</template>

<script>
import { db } from "boot/firebase";
export default {
  data() {
    return {
      editor: "",
      tasks: [],
      index: null,
      modoEdicion: false,
      id: null,
      texto: '',
      arrayFiltrado: []
    };
  },
  computed: {
    filtro:{
      get(){
        return this.texto;
      },
      set(value){
        value = value.toLowerCase();
        this.arrayFiltrado = this.tasks.filter(item => item.texto.toLowerCase().indexOf(value) !== -1);
        this.texto = value;
      }
    }
  },
  created() {
    this.mostrarTask();
    this.arrayFiltrado = this.tasks;
  },
  methods: {
    async mostrarTask() {
      try {
        const resDB = await db.collection("Task").get();
        resDB.forEach(res => {
          const task = {
            id: res.id,
            texto: res.data().texto,
            estado: res.data().estado
          };
          this.tasks.push(task);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async saveWork() {
      try {
        const resDB = await db.collection("Task").add({
          texto: this.editor,
          estado: false
        });
        this.$q.notify({
          message: "Nota guadada con exito",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done"
        });
        this.tasks.push({
          texto: this.editor,
          estado: false,
          id: resDB.id
        });
        this.editor = "";
      } catch (error) {
        console.log(error);
      }
    },
    eliminar(index, id) {
      this.$q
        .dialog({
          title: "Cuidado!",
          message: "Desea eliminar la nota?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          try {
            await db
              .collection("Task")
              .doc(id)
              .delete();
            this.tasks.splice(index, 1);
            this.$q.notify({
              message: "Nota eliminada con exito",
              color: "red-4",
              textColor: "white",
              icon: "delete"
            });
          } catch (error) {
            console.log(error);
          }
        });
    },
    editar(index, id) {
      this.modoEdicion = true;
      this.index = index;
      this.id = id;
      this.editor = this.tasks[index].texto;
    },
    async updateWork() {
      try {
        const resDB = await db.collection("Task").doc(this.id).update({
          texto:this.editor
        })
        this.tasks[this.index].texto = this.editor;
        this.$q.notify({
          message: "Nota editada con exito",
          color: "yellow-4",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.modoEdicion = false;
        this.index = null;
        this.id = null;
        this.editor = "";
      }
    },
  }
};
</script>
<style>
.tachar {
  text-decoration: line-through;
}
</style>
