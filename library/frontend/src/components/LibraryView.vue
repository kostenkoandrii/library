<template>
  <div class="library-wrapper">
    <el-dialog
        title="Attention!"
        :visible.sync="dialogVisible.status"
        width="30%"
    >
      <span>Do you want delete this book?</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible.status = false">Cancel</el-button>
          <el-button type="primary" @click="deleteRecord(dialogVisible.id)">Confirm</el-button>
        </span>
    </el-dialog>
    <div class="create-form-button">
      <el-button type="success" @click="goToCreateForm">Add New Book</el-button>
    </div>
    <div
        class="content-wrapper"
        v-for="(item, index) in booksNavigation.books" v-bind:key="item.id"
        v-bind:class="{background: !(index % 2)}"
    >
      <div class="pict-wrap">
        <div>
          <img :src='item.poster_image' width="100%" height="100%" alt="poster_img">
        </div>
        <div class="btn">
          <el-button
              @click="goToEditForm(item.id)"
              type="primary"
              icon="el-icon-edit"></el-button>
          <el-button
              @click="preDelete(item.id)"
              type="primary"
              icon="el-icon-delete"></el-button>
        </div>
      </div>
      <div class="text-wrapper">
        <div class="text-wrapper height">
          <span class="title">Title: <br></span>
          <span class="text">{{ item.title }}</span>
        </div>
        <div class="text-wrapper height">
          <span class="title">Author: <br></span>
          <span class="text">{{ item.author }}</span>
        </div>
        <div class="text-wrapper height">
          <span class="title">Description: <br></span>
          <div class="description"><span class="text">{{ item.description }}</span></div>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
          @current-change="currentClick"
          layout="prev, pager, next"
          :page-count="booksNavigation.totalPages">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "LibraryView",
  data() {
    return {
      dialogVisible: {
        status: false,
        id: null,
      },
    }
  },
  computed: {
      ...mapGetters({
        booksNavigation: 'getBooksNavigation'
      }),
    },
  methods: {
    currentClick(pg) {
      this.$store.dispatch('getBooks', pg).then(() => {}).catch(err => console.log(err))
    },
    preDelete(pk) {
      this.dialogVisible.status = true
      this.dialogVisible.id = pk
    },
    goToEditForm(id) {
      this.$router.push({name: 'edit-form', params: {id: id}}).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
    goToCreateForm() {
      this.$router.push({name: 'create-form',}).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
    getBooks() {
      this.$store.dispatch('getBooks', 1).catch(err => console.log(err))
    },
    deleteRecord(pk) {
      this.dialogVisible.status = false
      this.$store.dispatch('deleteRecord', pk).then(() => {
        this.$store.commit("setAlertSuccess", {status: true, title: 'Deleting Success'})
      }).catch(err => this.$store.commit("setAlertError", {status: true, title: 'Error'}))
    }
  },
  created() {
    this.getBooks()
  }
}
</script>

<style scoped>
.content-wrapper {
  display: flex;
  margin-left: 20px;
  margin-top: 10px;
}
.background {
  background-color: #fff5ee;
}
.text-wrapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 15px;
}
.title {
  font-size: 20px;
  color: #3a8ee6;
}
.text {
  padding-bottom: 5px;
  font-size: 12px;
  max-height: 40px;
}
.description {
  max-height: 40px;
  overflow: hidden;
}
.btn {
  display: flex;
  margin-top: 20px;
}
.pict-wrap {
  width: 120px;
  min-height: 150px;
}
.create-form-button {
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>