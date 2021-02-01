<template>
  <div class="library-wrapper">
    <el-form label-width="120px" class="demo-ruleForm">
      <div class="img-wrapper">
        <div>
          <img :src="image" width="100px" v-if="image"/>
        </div>
      </div>
      <el-form-item label="Image">
        <input
            style="color: transparent"
            type="file"
            class="input el-input__inner"
            @change="onFileChange">
      </el-form-item>
      <el-form-item label="Title">
        <el-input
            class="input"
            placeholder="Please input Title"
            v-model="libraryForm.title"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Author">
        <el-input
            class="input"
            placeholder="Please input Author"
            v-model="libraryForm.author"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          class="input"
          type="textarea"
          :rows="2"
          placeholder="Please input Description"
          v-model="libraryForm.description">
        </el-input>
      </el-form-item>
       <el-form-item>
        <el-button
            v-if="!$route.params.id"
            type="primary"
            @click="createBook">Create</el-button>
        <el-button
            v-if="$route.params.id"
            type="primary"
            @click="updateBook($route.params.id)">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreateForm",
  data() {
    return {
      libraryForm: {
        author: "",
        title: "",
        description: "",
      },
      image: "",
    }
  },
  methods: {
    getCurrentBook(id) {
      this.$store.dispatch('getCurrentBook', id).then((res) => {
        this.libraryForm.author = res.data.author
        this.libraryForm.title = res.data.title
        this.libraryForm.description = res.data.description
        this.image = res.data.poster_image
      }).catch(err => console.log(err))
    },
    onFileChange(e) {
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.libraryForm.poster_image = e.target.files[0]
    },
    createBook() {
      this.$store.dispatch('createBook', this.libraryForm).then(() => {
        this.$router.push({name: 'library'})
        this.$store.commit("setAlertSuccess", {status: true, title: 'Book Success Created'})
      }).catch(err => this.$store.commit("setAlertError", {status: true, title: 'Error Creating'}))
    },
    updateBook(id) {
      this.$store.dispatch('updateBook', {data: this.libraryForm, id: id}).then(() => {
        this.$router.push({name: 'library'})
        this.$store.commit("setAlertSuccess", {status: true, title: 'Book Success Updated'})
      }).catch(err => this.$store.commit("setAlertError", {status: true, title: 'Error Updating'}))
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getCurrentBook(this.$route.params.id)
    }
  }
}
</script>

<style scoped>

.library-wrapper {
  width: 70%;
  margin-top: 20px;
}
.input {
  margin: 5px;
}
.img-wrapper {
  display: flex;
  margin-left: 130px;
}

</style>
