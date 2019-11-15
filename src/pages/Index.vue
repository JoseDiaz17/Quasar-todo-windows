<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- Editor -->
    <q-editor
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
    <!-- Donde se pinta -->
    <q-card flat bordered class="row justify-between" v-for="(item, index) in tasks" :key="index">
      <q-card-section v-html="item.texto" class="col" :class="item.estado ? 'tachar' : ''"></q-card-section>
      <q-btn flat color="blue" @click="item.estado = !item.estado">Terminada</q-btn>
      <q-btn flat color="red" @click="eliminar(index)">Eliminar</q-btn>
      <q-space />
    </q-card>
    <div v-if="tasks.length == 0" class="flex flex-center">
      <p class="text-h6">Sin notas</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editor: "",
      tasks: [
      ]
    };
  },
  methods: {
    saveWork() {
      this.$q.notify({
        message: "Nota guadada con exito",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done"
      });
      this.tasks.push({
        texto: this.editor,
        estado: false
      });
      this.editor = "";
    },
    eliminar(index) {
      this.$q
        .dialog({
          title: "Cuidado!",
          message: "Desea eliminar la nota?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.tasks.splice(index, 1);
          this.$q.notify({
            message: "Nota eliminada con exito",
            color: "red-4",
            textColor: "white",
            icon: "delete"
          });
        });
    }
  }
};
</script>
<style>
.tachar {
  text-decoration: line-through;
}
</style>
