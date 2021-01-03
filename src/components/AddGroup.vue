<template>
  <div class="add-group">
    <Back />
    <div class="remove-add">
      <div class="add">
        <v-card>
          <v-card-title>Добавить группу</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="groupName"
              label="Название группы"
              outlined
              required
            ></v-text-field>
            <v-btn
              color="#007bff"
              dark
              @click="
                addGroup();
                getGroupListFromDB();
              "
              >Добавить</v-btn
            >
          </v-card-text>
        </v-card>
      </div>
      <div class="remove">
        <v-card>
          <v-card-title>Удалить группу</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="selectedGroup"
              :items="groupList"
              item-text="name"
              item-value="id"
              outlined
              label="Группa"
            ></v-autocomplete>
            <v-btn
              color="red lighten-1"
              dark
              @click="
                removeGroup();
                getGroupListFromDB();
              "
              >Удалить</v-btn
            >
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Back from "./Back";

export default {
  name: "AddGroup",
  components: {
    Back,
  },
  data() {
    return {
      groupName: "",
      selectedGroup: null,
    };
  },
  methods: {
    async addGroup() {
      let groupName = this.groupName;
      try {
        await this.$store.dispatch("addGroup", groupName);
        await this.$store.dispatch("getGroupListFromDB");
        this.groupName = "";
      } catch (error) {
        console.log(error);
      }
    },
    removeGroup() {
      this.$store.dispatch("removeGroup", {
        groupID: this.selectedGroup,
      });
    },
    getGroupListFromDB() {
      this.$store.dispatch("getGroupListFromDB");
    },
    convertGroupListToArray(groupList) {
      let tempArray = [];
      for (let key in groupList) {
        tempArray.push({
          id: key,
          name: groupList[key].groupName,
        });
      }
      return tempArray;
    },
  },
  computed: {
    groupList() {
      return this.convertGroupListToArray(this.$store.getters.groupList);
    },
  },
};
</script>

<style lang="scss" scoped>
.remove-add {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>