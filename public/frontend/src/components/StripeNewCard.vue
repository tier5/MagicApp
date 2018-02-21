<template>
  <div>
     <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <b>Add New Card </b>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div class="row">
                  <div class="col-md-8">
                   <stripe-card stripe="pk_test_aFYmaDW3rf5AHh7MkX2BSshB" :options="options"></stripe-card>
                  </div>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="row">
                  <div class="col-sm-6 pull-right">
                    <button class="modal-default-button btn btn-success" @click.prevent="addNewCard" :disabled ="!isCardValid">Add </button>
                    <button class="modal-default-button btn btn-primary" @click.prevent="hideCardModal" style="margin-right:5px;">Cancel</button>
                  </div>
                  <div class="col-sm-2 pull-right">
                    
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StripeCard from './StripeCard.vue';
import { createToken } from 'vue-stripe-elements-plus';
export default {
  data () {
    return {
     options:{},
    }
  },
  methods:{
    addNewCard(){
      this.$store.commit('changeLoading',true);
      createToken()
        .then(data => {
            var payload = {
              cardToken : data.token.id,
              card : data.token.card
            }
            this.$store.dispatch('addUserCard',payload)
        }).catch((err)=>{
            console.log(err);
        })
    },
    hideCardModal(){
      this.$store.commit('changeCardModal',false);
    }
  },
  components:{
    StripeCard
  },
  computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'isCardValid',
          ''
        ]),
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 60%;
    overflow-y: auto;
    height: 30%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }
  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }
</style>
