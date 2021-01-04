<template>
  <div class="contacts">
    <Back />
    <v-card>
      <v-card-title>Контакты</v-card-title>
      <v-card-text>
        Жду ваши жалобы и предложения у себя в личных сообщениях 💌
      </v-card-text>
      <v-card-actions>
        <v-list dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <a href="https://t.me/ozzmo" class="link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="#28A8E9">mdi-telegram</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="link__title">
                  @ozzmo
                </v-list-item-title>
              </v-list-item>
            </a>
            <a href="https://vk.com/id240530388" class="link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="#2787F5">mdi-vk</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="link__title">
                  Валерий Местер
                </v-list-item-title>
              </v-list-item>
            </a>
          </v-list-item-group>
        </v-list>
      </v-card-actions>
    </v-card>
  </div>
</template>




<script>
import Back from "../components/Back";
export default {
  name: "Contacts",
  components: {
    Back,
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
}

.link__title {
  color: #1976d2;
}

.contacts .v-list-item__icon {
  margin-right: 1rem !important;
}
</style>