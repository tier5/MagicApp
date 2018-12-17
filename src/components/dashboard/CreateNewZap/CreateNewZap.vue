<template>
  <div>
    <v-card-text>
      <img src="../../../assets/images/logo.png" alt="Header Logo" class="header-logo">
      <h2>Create a new ZAP</h2>
      <p>Add multiple Params and Attributes as you need</p>
    </v-card-text>
    <v-card class="create-zap-form">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout row wrap>
          <span class="progress-bar filled">
            <span class="dot"></span> Name
          </span>
          <v-flex xs12>
            <v-card-text>
              <v-text-field v-model="name" :rules="nameRules" placeholder="Zap Name" required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <span class="progress-bar filled">
            <span class="dot"></span> Params
          </span>
          <v-flex md4 xs12>
            <v-card-text>
              <v-text-field v-model="paramName" placeholder="Param Name" required></v-text-field>
              <span>ex.email</span>
            </v-card-text>
          </v-flex>
          <v-flex md3 xs12>
            <v-card-text>
              <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Required']"
                placeholder="Select"
                required
              ></v-select>
            </v-card-text>
          </v-flex>
          <v-flex md4 xs12>
            <v-card-text>
              <v-text-field v-model="value" placeholder="Value" required></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex md1 xs12>
            <v-card-text class="add-zap-field">
              <img src="../../../assets/images/Add_record_icon.png" alt="icon" class="icon-add">
            </v-card-text>
          </v-flex>
          <v-flex md12 class="tags-section">
            <v-card-text>
              <ul>
                <li>
                  <span>email : Exists</span>
                  <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross">
                </li>
                <li>
                  <span>name : !=</span>
                  <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross">
                </li>
              </ul>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <span class="progress-bar">
            <span class="dot"></span> Attributes
          </span>
          <v-flex md6 xs12>
            <v-card-text>
              <v-text-field v-model="paramName2" placeholder="Param Name" required></v-text-field>
              <span>ex.email</span>
            </v-card-text>
          </v-flex>
          <v-flex md5 xs12>
            <v-card-text>
              <v-select
                v-model="selectType"
                :items="items"
                :rules="[v => !!v || 'Type is required']"
                placeholder="Select Type"
                required
              ></v-select>
              <span>ex.name</span>
            </v-card-text>
          </v-flex>
          <v-flex md1 xs12>
            <v-card-text class="add-zap-field">
              <img src="../../../assets/images/Add_record_icon.png" alt="icon" class="icon-add">
            </v-card-text>
          </v-flex>
          <v-flex md12 class="tags-section">
            <v-card-text>
              <ul>
                <li>
                  <span>email - name</span>
                  <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross">
                </li>
                <li>
                  <span>name - name</span>
                  <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross">
                </li>
              </ul>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md12 text-xs-center>
            <v-btn :disabled="!valid" @click="submit" class="submit-btn">
              <img src="../../../assets/images/icon-zap-white.png">
              <span>Create my ZAP</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      mini: false,
      right: null,

      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      valid: true,
      name: "",
      paramName: "",
      value: "",
      paramName2: "",
      selectType: "",
      select: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../../styles/common.scss";
@import "./CreateNewZap.scss";
</style>