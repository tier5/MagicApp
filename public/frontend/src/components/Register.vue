<template>
  <div>
            <header class="cd-main-header">
                <h1>Animated Sign Up Flow</h1>
              </header>

              <ul class="cd-pricing">
                <li>
                  <header class="cd-pricing-header">
                    <h2>Basic</h2>

                    <div class="cd-price">
                      <span>$0.00</span>
                      <span> for the first month </span>
                    </div>
                  </header> <!-- .cd-pricing-header -->

                  <div class="cd-pricing-features">
                    <ul>
                      <li class="available"><em>Feature 1</em></li>
                      <li><em>Feature 2</em></li>
                      <li><em>Feature 3</em></li>
                      <li><em>Feature 4</em></li>
                    </ul>
                  </div> <!-- .cd-pricing-features -->

                  <footer class="cd-pricing-footer">
                    <a href="#0">Select</a>
                  </footer> <!-- .cd-pricing-footer -->
                </li>
                
                <!-- <li>
                  <header class="cd-pricing-header">
                    <h2>Popular</h2>

                    <div class="cd-price">
                      <span>$19.99</span>
                      <span>month</span>
                    </div>
                  </header> 

                  <div class="cd-pricing-features">
                    <ul>
                      <li class="available"><em>Feature 1</em></li>
                      <li class="available"><em>Feature 2</em></li>
                      <li><em>Feature 3</em></li>
                      <li><em>Feature 4</em></li>
                    </ul>
                  </div> 

                  <footer class="cd-pricing-footer">
                    <a href="#0">Select</a>
                  </footer> 
                </li> -->

                <li>
                  <header class="cd-pricing-header">
                    <h2>Premier</h2>

                    <div class="cd-price">
                      <span>$10.00</span>
                      <span>month</span>
                    </div>
                  </header> <!-- .cd-pricing-header -->

                  <div class="cd-pricing-features">
                    <ul>
                      <li class="available"><em>Feature 1</em></li>
                      <li class="available"><em>Feature 2</em></li>
                      <li class="available"><em>Feature 3</em></li>
                      <li class="available"><em>Feature 4</em></li>
                    </ul>
                  </div> <!-- .cd-pricing-features -->

                  <footer class="cd-pricing-footer">
                    <a href="#0">Select</a>
                  </footer> <!-- .cd-pricing-footer -->
                </li>
              </ul> <!-- .cd-pricing -->

              <div class="cd-form">
                
                <div class="cd-plan-info">
                  <!-- content will be loaded using jQuery - according to the selected plan -->
                </div>

                <div class="cd-more-info">
                  <h3>Need help?</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                
                <form action="">
                  <fieldset>
                    <legend>Account Info</legend>
                    
                    <div class="half-width">
                      <label for="userName">Name</label>
                      <input type="text" id="userName" name="userName">
                    </div>
                    
                    <div class="half-width">
                      <label for="userEmail">Email</label>
                      <input type="email" id="userEmail" name="userEmail">
                    </div>
                    
                    <div class="half-width">
                      <label for="userPassword">Password</label>
                      <input type="password" id="userPassword" name="userPassword">
                    </div>
                    
                    <div class="half-width">
                      <label for="userPasswordRepeat">Repeat Password</label>
                      <input type="password" id="userPasswordRepeat" name="userPasswordRepeat">
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>Payment Method</legend>
                    
                    <div>
                      <ul class="cd-payment-gateways">
                        <li>
                          <input type="radio" name="payment-method" id="paypal" value="paypal">
                          <label for="paypal">Paypal</label>
                        </li>
                        
                        <li>
                          <input type="radio" name="payment-method" id="card" value="card" checked>
                          <label for="card">Card</label>
                        </li>
                      </ul> <!-- .cd-payment-gateways -->
                    </div>
                    
                    <div class="cd-credit-card">
                      <div>
                        <p class="half-width">
                          <label for="cardNumber">Card Number</label>
                          <input type="text" id="cardNumber" name="cardNumber">
                        </p>

                        <p class="half-width">
                          <label>Expiration date</label>
                          <b>
                            <span class="cd-select">
                              <select name="card-expiry-month" id="card-expiry-month">
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                                <option value="1">5</option>
                                <option value="1">6</option>
                                <option value="1">7</option>
                                <option value="1">8</option>
                                <option value="1">9</option>
                                <option value="1">10</option>
                                <option value="1">11</option>
                                <option value="1">12</option>
                              </select>
                            </span>

                            <span class="cd-select">
                              <select name="card-expiry-year" id="card-expiry-year">
                                <option value="2015">2015</option>
                                <option value="2015">2016</option>
                                <option value="2015">2017</option>
                                <option value="2015">2018</option>
                                <option value="2015">2019</option>
                                <option value="2015">2020</option>
                              </select>
                            </span>
                          </b>
                        </p>
                        
                        <p class="half-width">
                          <label for="cardCvc">Card CVC</label>
                          <input type="text" id="cardCvc" name="cardCvc">
                        </p>
                      </div>
                    </div> <!-- .cd-credit-card -->
                  </fieldset>
                  
                  <fieldset>
                    <div>
                      <input type="submit" value="Get started">
                    </div>
                  </fieldset>
                </form>

                <a href="#0" class="cd-close"></a>
              </div> <!-- .cd-form -->
              
              <div class="cd-overlay"></div> <!-- shadow layer -->
  </div>
</template>

<script>
  import { required, email, minLength, sameAs} from 'vuelidate/lib/validators';
  import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
        userSU:{
          name:'',
          email:'',
          password:'',
          confirmPassword:''
        }
      }
    },
    methods:{
      onSignUp () {
        this.$store.dispatch('userSignUp', this.userSU)
      },
      resetForm(){
        this.userSU = {};
        this.$v.userSU.$reset();
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'plans',

        ]),
    },
    validations:{
      userSU:{
        name:{
          required
        },
        email:{
          required,
          email
        },
        password:{
          required,
          minLength: minLength(6)
        },
        confirmPassword:{
          sameAsPassword: sameAs('password')
        }
      }
    },
    created(){
      jQuery(document).ready(function($){
                    if( $('.cd-form').length > 0 ) {
                      //set some form parameters
                      var device = checkWindowWidth(),
                        tableFinalWidth = ( device == 'mobile') ? $(window).width()*0.9 : 210,
                        tableFinalHeight = ( device == 'mobile' ) ? 93 : 255,
                        formMaxWidth = 900,
                        formMaxHeight = 650,
                        animating =  false; 

                      //set animation duration/delay
                      var	animationDuration = 800,
                        delay = 200,
                        backAnimationDuration = animationDuration - delay;

                      //store DOM elements
                      var formPopup = $('.cd-pricing'),
                        coverLayer = $('.cd-overlay');

                      //select a plan and open the signup form
                      formPopup.on('click', 'a', function(event){
                        event.preventDefault();
                        triggerAnimation( $(this).parents('.cd-pricing-footer').parent('li'), coverLayer, true);
                      });

                      //close the signup form clicking the 'X' icon, the keyboard 'esc' or the cover layer
                      $('.cd-form').on('click', '.cd-close', function(event){
                        event.preventDefault();
                        triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
                      });
                      $(document).keyup(function(event){
                        if( event.which=='27' ) {
                          triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
                        }
                      });
                      coverLayer.on('click', function(event){
                        event.preventDefault();
                        triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
                      });

                      //on resize - update form position/size
                      $(window).on('resize', function(){
                        requestAnimationFrame(updateForm);
                      });

                      //show/hide credit card fields if user selected credit card as gateway
                      $('.cd-payment-gateways').on('change', function(){
                        ($('#card').is(':checked')) 
                          ? $('.cd-credit-card').velocity("slideDown", { duration: 300 }) 
                          : $('.cd-credit-card').velocity("slideUp", { duration: 300 });
                      });

                    }

                    function triggerAnimation(table, layer, bool) {
                      if( !animating ) {
                        layer.toggleClass('is-visible', bool);
                        animateForm(table, bool);
                        table.toggleClass('selected-table', bool);
                      }
                    }

                    function animateForm(table, animationType) {
                      animating = true;

                      var tableWidth = table.width(),
                        tableHeight = table.height(),
                        tableTop = table.offset().top - $(window).scrollTop(),
                        tableLeft = table.offset().left,
                        form = $('.cd-form'),
                        formPlan = form.find('.cd-plan-info'),
                        formFinalWidth = formWidth(),
                        formFinalHeight = formHeight(),
                        formTopValue = formTop(formFinalHeight),
                        formLeftValue = formLeft(formFinalWidth),
                        formTranslateY = tableTop - formTopValue,
                        formTranslateX = tableLeft - formLeftValue,
                        windowWidth = $(window).width(),
                        windowHeight = $(window).height();

                      if( animationType ) {//open the form
                        //set the proper content for the .cd-plan-info inside the form
                        formPlan.html(table.html());

                        //animate plan info inside the form - set initial width and hight - then animate them to their final values
                        formPlan.velocity(
                        {
                          'width': tableWidth+'px',
                          'height': tableHeight+'px',
                        }, 50, function(){
                          formPlan.velocity(
                          {
                            'width': tableFinalWidth+'px',
                            'height': tableFinalHeight+'px',
                          }, animationDuration, [ 220, 20 ]);
                        });

                        //animate popout form - set initial width, hight and position - then animate them to their final values
                        form.velocity(
                        {
                          'width': tableWidth+'px',
                          'height': tableHeight+'px',
                          'top': formTopValue,
                          'left': formLeftValue,
                          'translateX': formTranslateX+'px',
                          'translateY': formTranslateY+'px',
                          'opacity': 1,
                        }, 50, function(){
                          table.addClass('empty-box');
                          
                          form.velocity(
                          {
                            'width': formFinalWidth+'px',
                            'height': formFinalHeight+'px',
                            'translateX': 0,
                            'translateY': 0,
                          }, animationDuration, [ 220, 20 ], function(){
                            animating = false;
                            setTimeout(function(){
                              form.children('form').addClass('is-scrollable');
                            }, 300);
                          }).addClass('is-visible');

                        });
                      } else {//close the form
                        form.children('form').removeClass('is-scrollable');

                        //animate plan info inside the form to its final dimension
                        formPlan.velocity(
                        {
                          'width': tableWidth+'px',
                        }, {
                          duration: backAnimationDuration,
                          easing: "easeOutCubic",
                          delay: delay
                        });

                        //animate form to its final dimention/position
                        form.velocity(
                        {
                          'width': tableWidth+'px',
                          'height': tableHeight+'px',
                          'translateX': formTranslateX+'px',
                          'translateY': formTranslateY+'px',
                        }, {
                          duration: backAnimationDuration,
                          easing: "easeOutCubic",
                          delay: delay,
                          complete: function(){
                            table.removeClass('empty-box');
                            form.velocity({
                              'translateX': 0,
                              'translateY': 0,
                              'opacity' : 0,
                            }, 0).find('form').scrollTop(0);
                            animating = false;
                          }
                        }).removeClass('is-visible');

                        //target browsers not supporting transitions
                        if($('.no-csstransitions').length > 0 ) table.removeClass('empty-box');
                      }
                    }

                    function checkWindowWidth() {
                      var mq = window.getComputedStyle(document.querySelector('.cd-form'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, '');
                      return mq;
                    }

                    function updateForm() {
                      var device = checkWindowWidth(),
                        form = $('.cd-form');
                      tableFinalWidth = ( device == 'mobile') ? $(window).width()*0.9 : 210;
                      tableFinalHeight = ( device == 'mobile' ) ? 93 : 255;
                      
                      if(form.hasClass('is-visible')) {
                        var formFinalWidth = formWidth(),
                          formFinalHeight = formHeight(),
                          formTopValue = formTop(formFinalHeight),
                          formLeftValue = formLeft(formFinalWidth);
                        
                        form.velocity(
                        {
                          'width': formFinalWidth,
                          'height': formFinalHeight,
                          'top': formTopValue,
                          'left': formLeftValue,
                        }, 0).find('.cd-plan-info').velocity(
                        {
                          'width': tableFinalWidth+'px',
                          'height': tableFinalHeight+'px',
                        }, 0);
                      }
                    }

                    //evaluate form dimention/position
                    function formWidth() {
                      return ( formMaxWidth <= $(window).width()*0.9) ? formMaxWidth : $(window).width()*0.9;
                    }
                    function formHeight() {
                      return ( formMaxHeight <= $(window).height()*0.9) ? formMaxHeight : $(window).height()*0.9;
                    }
                    function formTop(formHeight) {
                      return ($(window).height() - formHeight)/2;
                    }
                    function formLeft(formWidth) {
                      return ($(window).width() - formWidth)/2;
                    }

                  });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .app_register_form{
    border: solid 1px gray;
    padding: 20px;

  }
  .app_register {
    margin-top: 200px;
  }
  .form-group--error input{
    border-color: red;
  }
  .form-group__message{
    color: red;
  } */
  


  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section, main {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

      /* -------------------------------- 

    Primary style

    -------------------------------- */
    *, *::after, *::before {
      box-sizing: border-box;
    }

    html {
      font-size: 62.5%;
    }

    body {
      font-size: 1.6rem;
      font-family: "Open Sans", sans-serif;
      color: #0f222b;
      background-color: #0f222b;
    }

    a {
      color: #3399ff;
      text-decoration: none;
    }

    input {
      font-family: "Open Sans", sans-serif;
      font-size: 1.6rem;
    }

    /* -------------------------------- 

    Header - not needed in production

    -------------------------------- */
    .cd-main-header {
      height: 170px;
      line-height: 170px;
      text-align: center;
    }
    .cd-main-header h1 {
      color: #ffffff;
      font-weight: 300;
      font-size: 2rem;
    }
    @media only screen and (min-width: 1024px) {
      .cd-main-header {
        height: 220px;
        line-height: 220px;
      }
      .cd-main-header h1 {
        font-size: 2.6rem;
      }
    }

    /* -------------------------------- 

    Pricing tables 

    -------------------------------- */
    .cd-pricing {
      width: 90%;
      max-width: 280px;
      margin: 0 auto;
      text-align: center;
    }
    .cd-pricing > li {
      position: relative;
      margin: 0 auto 2.5em;
      background-color: #ffffff;
      border-radius: .3em .3em .25em .25em;
      box-shadow: 0 2px 8px rgba(2, 4, 5, 0.5);
    }
    .cd-pricing > li.empty-box {
      box-shadow: none;
    }
    .cd-pricing > li.empty-box::after {
      /* placeholder visible when .cd-form is open - in this case same color of the background */
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0f222b;
    }
    @media only screen and (min-width: 768px) {
      .cd-pricing {
        max-width: 1000px;
      }
      .cd-pricing > li {
        width: 32%;
        float: left;
        margin-right: 2%;
        margin-bottom: 0;
      }
      .cd-pricing > li:last-of-type {
        margin-right: 0;
      }
    }
    @media only screen and (min-width: 1024px) {
      .cd-pricing > li {
        width: 28.0%;
        float: left;
        margin-right: 8%;
      }
    }

    .cd-pricing-header {
      padding: 1.3em 1em;
      background-color: #3399ff;
      border-radius: .25em .25em 0 0;
      box-shadow: inset 0 1px 0 #3399ff;
      color: #ffffff;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .cd-pricing-header h2, .cd-pricing-header .cd-price {
      line-height: 1.2;
    }
    .cd-pricing-header h2 {
      font-size: 2rem;
      margin-bottom: 0.15em;
    }
    .cd-pricing-header .cd-price {
      display: inline-block;
      font-weight: bold;
    }
    .cd-pricing-header .cd-price::after {
      clear: both;
      content: "";
      display: table;
    }
    .cd-pricing-header span {
      float: left;
    }
    .cd-pricing-header span:nth-of-type(2) {
      color: #ffffff;
    }
    .cd-pricing-header span:nth-of-type(2)::before {
      content: '/';
    }
    @media only screen and (min-width: 768px) {
      .cd-pricing-header h2 {
        font-size: 2.6rem;
      }
    }

    .cd-pricing-features {
      padding: 2.8em 1em 2.5em;
    }
    .cd-pricing-features li {
      line-height: 1.5;
      margin-bottom: .4em;
    }
    .cd-pricing-features li:last-of-type {
      margin-bottom: 0;
    }
    .cd-pricing-features em {
      position: relative;
      padding-left: 28px;
    }
    .cd-pricing-features em::before {
      /* this is the icon (check or cross) next to the plan feature */
      position: absolute;
      content: '';
      left: 0;
      top: 50%;
      bottom: auto;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      height: 24px;
      width: 24px;
      background: url(../assets/cd-icons-plan.svg) no-repeat -24px 0;
    }
    .cd-pricing-features .available em::before {
      background-position: 0 0;
    }

    .cd-pricing-footer {
      padding-bottom: 1.7em;
    }
    .cd-pricing-footer a {
      -webkit-transition: -webkit-transform 0.3s;
      -moz-transition: -moz-transform 0.3s;
      transition: transform 0.3s;
    }
    .empty-box .cd-pricing-footer a {
      /* scale down to 0 the action button when sign up form is visible */
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
      -ms-transform: scale(0);
      -o-transform: scale(0);
      transform: scale(0);
    }

    /* -------------------------------- 

    Form 

    -------------------------------- */
    .cd-form {
      position: fixed;
      z-index: 2;
      background-color: #ffffff;
      border-radius: .25em;
      visibility: hidden;
      -webkit-transition: visibility 0s 0.8s;
      -moz-transition: visibility 0s 0.8s;
      transition: visibility 0s 0.8s;
      /* Force Hardware Acceleration in WebKit */
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    .cd-form::before {
      /* never visible - this is used in jQuery to check the current MQ */
      display: none;
      content: 'mobile';
    }
    .cd-form::after {
      /* gradient visible at the bottom of the form - to indicate it's possible to scroll */
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      height: 30px;
      width: 100%;
      border-radius: 0 0 .25em .25em;
      background-color: rgba(255, 255, 255, 0);
      background-image: -webkit-linear-gradient(bottom, white, rgba(255, 255, 255, 0));
      background-image: linear-gradient(to top,white, rgba(255, 255, 255, 0));
      pointer-events: none;
    }
    .cd-form .cd-plan-info {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      text-align: center;
    }
    .cd-form .cd-plan-info > * {
      width: 100%;
    }
    .cd-form .cd-pricing-features {
      position: relative;
      -webkit-transition: opacity 0.3s 0s, visibility 0s 0s;
      -moz-transition: opacity 0.3s 0s, visibility 0s 0s;
      transition: opacity 0.3s 0s, visibility 0s 0s;
    }
    .cd-form .cd-pricing-features::before {
      /* this is the layer which covers the .cd-pricing-features when the form is open - visible only on desktop */
      content: '';
      position: absolute;
      /* fix a bug while animating - 1px white space visible */
      top: -5px;
      left: 0;
      height: calc(100% + 5px);
      width: 100%;
      background-color: #3399ff;
      will-change: transform;
      -webkit-transform: scaleY(0);
      -moz-transform: scaleY(0);
      -ms-transform: scaleY(0);
      -o-transform: scaleY(0);
      transform: scaleY(0);
      -webkit-transform-origin: center top;
      -moz-transform-origin: center top;
      -ms-transform-origin: center top;
      -o-transform-origin: center top;
      transform-origin: center top;
      -webkit-transition: -webkit-transform 0.6s 0.2s;
      -moz-transition: -moz-transform 0.6s 0.2s;
      transition: transform 0.6s 0.2s;
    }
    .cd-form .cd-pricing-footer {
      display: none;
    }
    .cd-form .cd-more-info {
      position: absolute;
      z-index: 1;
      height: 100%;
      width: 210px;
      bottom: 0;
      left: 0;
      padding: 285px 1.8em 2em;
      background-color: #f2f2f2;
      border-radius: .25em 0 0 .25em;
      /* hidden on mobile */
      display: none;
      -webkit-transition: opacity 0.6s;
      -moz-transition: opacity 0.6s;
      transition: opacity 0.6s;
    }
    .cd-form .cd-more-info h3 {
      line-height: 2;
    }
    .cd-form .cd-more-info p {
      font-size: 1.3rem;
      color: #999999;
      line-height: 1.6;
    }
    .cd-form form {
      padding-top: 90px;
      height: 100%;
      overflow: hidden;
    }
    .cd-form form.is-scrollable {
      overflow-y: auto;
    }
    .cd-form fieldset {
      opacity: 0;
      margin: 1.5em 2em;
      /* Force Hardware Acceleration in WebKit */
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      will-change: transform;
      -webkit-transform: translateY(50px);
      -moz-transform: translateY(50px);
      -ms-transform: translateY(50px);
      -o-transform: translateY(50px);
      transform: translateY(50px);
      -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;
      -moz-transition: opacity 0.2s, -moz-transform 0.2s;
      transition: opacity 0.2s, transform 0.2s;
    }
    .cd-form fieldset > div,
    .cd-form fieldset .cd-credit-card > div {
      padding-top: 1.2em;
    }
    .cd-form fieldset > .cd-credit-card {
      padding-top: 0;
    }
    .cd-form fieldset div::after {
      clear: both;
      content: "";
      display: table;
    }
    .cd-form fieldset:last-of-type > div {
      padding-top: 0;
    }
    .cd-form legend {
      width: 100%;
      font-size: 2.3rem;
      line-height: 1.2;
      padding-bottom: 0.3em;
      border-bottom: 1px solid #e5e5e5;
    }
    .cd-form input[type="radio"],
    .cd-form label {
      cursor: pointer;
    }
    .cd-form label {
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #b2b2b2;
    }
    .cd-form input[type="radio"] + label {
      color: #0f222b;
    }
    .cd-form input[type="text"],
    .cd-form input[type="email"],
    .cd-form input[type="password"],
    .cd-form select {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      -o-appearance: none;
      appearance: none;
      height: 45px;
      border: 2px solid #e5e5e5;
      border-radius: 0;
      background: transparent;
    }
    .cd-form input[type="text"]:focus,
    .cd-form input[type="email"]:focus,
    .cd-form input[type="password"]:focus,
    .cd-form select:focus {
      outline: none;
      border-color: #3399ff;
    }
    .cd-form input[type="text"],
    .cd-form input[type="email"],
    .cd-form input[type="password"] {
      width: 100%;
      display: block;
      margin-top: 6px;
      padding: 0 16px;
    }
    .cd-form select {
      padding: 0 25px 0 15px;
      font-size: 1.4rem;
    }
    .cd-form select::-ms-expand {
      /* remove default arrows in IE */
      display: none;
    }
    .cd-form .cd-credit-card b {
      display: block;
    }
    .cd-form .cd-credit-card p {
      padding-bottom: 0.5em;
    }
    .cd-form .cd-credit-card p:last-of-type {
      width: 100px;
    }
    .cd-form .cd-select {
      display: inline-block;
      position: relative;
      margin-top: 6px;
    }
    .cd-form .cd-select::after {
      /* arrow icons */
      content: '';
      position: absolute;
      top: 50%;
      bottom: auto;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 10px;
      height: 6px;
      width: 10px;
      background: url(../assets/cd-icon-arrow.svg) no-repeat center center;
      pointer-events: none;
    }
    .cd-form .cd-close {
      /* 'X' close icon */
      position: absolute;
      z-index: 2;
      right: 0;
      top: 0;
      height: 40px;
      width: 40px;
      background: url(../assets/cd-icon-close.svg) no-repeat center center;
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
      -ms-transform: scale(0);
      -o-transform: scale(0);
      transform: scale(0);
      -webkit-transition: -webkit-transform 0.2s;
      -moz-transition: -moz-transform 0.2s;
      transition: transform 0.2s;
      /* image replacement */
      overflow: hidden;
      text-indent: 100%;
      white-space: nowrap;
      color: transparent;
    }
    .cd-form.is-visible {
      /* form is visible */
      visibility: visible;
      -webkit-transition: visibility 0s 0s;
      -moz-transition: visibility 0s 0s;
      transition: visibility 0s 0s;
    }
    .cd-form.is-visible .cd-pricing-features {
      /* desktop only */
      opacity: 0;
      visibility: hidden;
      -webkit-transition: opacity 0.6s 0s, visibility 0s 0.8s;
      -moz-transition: opacity 0.6s 0s, visibility 0s 0.8s;
      transition: opacity 0.6s 0s, visibility 0s 0.8s;
    }
    .cd-form.is-visible form {
      -webkit-overflow-scrolling: touch;
    }
    .cd-form.is-visible fieldset {
      opacity: 1;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
      -webkit-transition: -webkit-transform 0.3s 0.6s, opacity 0.3s 0.6s;
      -moz-transition: -moz-transform 0.3s 0.6s, opacity 0.3s 0.6s;
      transition: transform 0.3s 0.6s, opacity 0.3s 0.6s;
    }
    .cd-form.is-visible fieldset:nth-of-type(2) {
      /* delay second fieldset animation */
      -webkit-transition: -webkit-transform 0.3s 0.7s, opacity 0.3s 0.7s;
      -moz-transition: -moz-transform 0.3s 0.7s, opacity 0.3s 0.7s;
      transition: transform 0.3s 0.7s, opacity 0.3s 0.7s;
    }
    .cd-form.is-visible fieldset:nth-of-type(3) {
      /* delay second fieldset animation */
      -webkit-transition: -webkit-transform 0.3s 0.8s, opacity 0.3s 0.8s;
      -moz-transition: -moz-transform 0.3s 0.8s, opacity 0.3s 0.8s;
      transition: transform 0.3s 0.8s, opacity 0.3s 0.8s;
    }
    .cd-form.is-visible .cd-close {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
      -webkit-transition: -webkit-transform 0.3s 0.8s;
      -moz-transition: -moz-transform 0.3s 0.8s;
      transition: transform 0.3s 0.8s;
    }
    @media only screen and (min-width: 768px) {
      .cd-form::before {
        /* never visible - this is used in jQuery to check the current MQ */
        content: 'desktop';
      }
      .cd-form .cd-pricing-header {
        border-radius: .25em 0 0 0;
      }
      .cd-form .cd-pricing-features {
        -webkit-transition: padding 0.3s 0.2s;
        -moz-transition: padding 0.3s 0.2s;
        transition: padding 0.3s 0.2s;
      }
      .cd-form .cd-more-info {
        display: block;
        opacity: 0;
      }
      .cd-form form {
        padding: 0 0 0 210px;
      }
      .cd-form .half-width {
        width: 48%;
        float: left;
        margin-right: 4%;
      }
      .cd-form .half-width:nth-of-type(2n) {
        margin-right: 0;
      }
      .cd-form input[type="submit"] {
        float: right;
      }
      .cd-form .cd-close {
        /* move close icon outside the form container */
        top: -40px;
        right: -5px;
      }
      .cd-form.is-visible .cd-pricing-features {
        padding-top: 0;
        opacity: 1;
        visibility: visible;
        -webkit-transition: padding 0.3s;
        -moz-transition: padding 0.3s;
        transition: padding 0.3s;
      }
      .cd-form.is-visible .cd-pricing-features::before {
        -webkit-transform: scaleY(1);
        -moz-transform: scaleY(1);
        -ms-transform: scaleY(1);
        -o-transform: scaleY(1);
        transform: scaleY(1);
        -webkit-transition: -webkit-transform 0.4s 0s;
        -moz-transition: -moz-transform 0.4s 0s;
        transition: transform 0.4s 0s;
      }
      .cd-form.is-visible .cd-more-info {
        opacity: 1;
      }
    }
    @media only screen and (min-width: 1024px) {
      .cd-form .cd-credit-card p:nth-of-type(2) {
        width: 25%;
        margin-right: 4%;
      }
      .no-csstransitions .cd-form .cd-credit-card p:nth-of-type(2) {
        width: 48%;
        margin-right: 0;
      }
      .cd-form .cd-credit-card p:nth-of-type(3) {
        width: 19%;
        margin-right: 0;
      }
    }

    /* -------------------------------- 

    Buttons 

    -------------------------------- */
    .cd-pricing-footer a, .cd-form input[type="submit"] {
      display: inline-block;
      padding: 1em 1.8em;
      border-radius: 50em;
      text-transform: uppercase;
      font-size: 1.3rem;
      font-weight: bold;
    }

    .cd-pricing-footer a {
      border: 1px solid rgba(223, 79, 113, 0.4);
      color: #df4f71;
    }

    .cd-form input[type="submit"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      -o-appearance: none;
      appearance: none;
      background-color: #df4f71;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }

    /* -------------------------------- 

    Shadow layer 

    -------------------------------- */
    .cd-overlay {
      /* shadow layer visible when navigation is open */
      position: fixed;
      z-index: 1;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: rgba(15, 34, 43, 0.8);
      visibility: hidden;
      opacity: 0;
      -webkit-transition: opacity 0.6s 0.2s, visibility 0s 0.8s;
      -moz-transition: opacity 0.6s 0.2s, visibility 0s 0.8s;
      transition: opacity 0.6s 0.2s, visibility 0s 0.8s;
    }
    .cd-overlay.is-visible {
      opacity: 1;
      visibility: visible;
      -webkit-transition: opacity 0.8s 0s, visibility 0s 0s;
      -moz-transition: opacity 0.8s 0s, visibility 0s 0s;
      transition: opacity 0.8s 0s, visibility 0s 0s;
    }

</style>
