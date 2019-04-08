<template>
    <div>
        <div class="cookieCompliance showCookie">
            <div class="container">
                <p>
                    We use cookies to offer you a better experience and analyze site traffic. By continuing to use this
                    website, you consent to the use of cookies
                </p>

                <button class="closeCookie" @click.prevent="acceptCookie()">
                    Accept
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data(){
        return {

        }
    },
    computed:{

    },
    methods:{
        acceptCookie(){
            this.$store.commit("acceptCookiePolicy")
        }
    }
}
</script>

<style>
/* Cookie policy */
.cookieCompliance {
    padding: 15px;
    background: #333;
    -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: -webkit-transform ease-in-out 0.4s;
    transition: -webkit-transform ease-in-out 0.4s;
    transition: transform ease-in-out 0.4s;
    transition: transform ease-in-out 0.4s, -webkit-transform ease-in-out 0.4s;
    -webkit-transform: translateY(200%);
    transform: translateY(200%);
}

.showCookie {
    -webkit-transform: translateY(0);
    transform: translateY(0);
}

.cookieCompliance .container {
    margin-top: 0;
    margin-bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    max-width: 1205px;
    margin: 0 auto;
}
.cookieCompliance .container p{
    margin-bottom: 0;
}
.cookieCompliance p {
    font-size: 13px;
    color: #fff;
    line-height: 18px;
}

.cookieCompliance p a {
    color: #fff;
    margin-left: 3px;
}

.cookieCompliance p a:hover {
    color: rgba(255, 97, 0, 0.9);
}

.closeCookie {
    font-size: 15px;
    color: #fff;
    line-height: 32px;
    padding: 0 15px;
    border-radius: 3px;
    border: none;
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.cookieCompliance .closeCookie {
    margin-left: 30px;
    background: rgba(255, 97, 0, 0.9);
}

.cookieCompliance .closeCookie:hover {
    color: #333;
    background-color: #fff;
}

</style>
