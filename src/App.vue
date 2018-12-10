<template>
  <div>
     <v-app>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div> 
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      data : ''
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './styles/common.scss';
  @font-face {
    font-family: 'Avenir LT Std 55 Roman';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 55 Roman'), url('assets/fonts/AvenirLTStd-Roman.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 55 Oblique';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 55 Oblique'), url('assets/fonts/AvenirLTStd-Oblique.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 35 Light';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 35 Light'), url('assets/fonts/AvenirLTStd-Light.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 35 Light Oblique';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 35 Light Oblique'), url('assets/fonts/AvenirLTStd-LightOblique.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 45 Book';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 45 Book'), url('assets/fonts/AvenirLTStd-Book.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 45 Book Oblique';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 45 Book Oblique'), url('assets/fonts/AvenirLTStd-BookOblique.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 65 Medium';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 65 Medium'), url('assets/fonts/AvenirLTStd-Medium.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 65 Medium Oblique';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 65 Medium Oblique'), url('assets/fonts/AvenirLTStd-MediumOblique.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 85 Heavy';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 85 Heavy'), url('assets/fonts/AvenirLTStd-Heavy.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 85 Heavy Oblique';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 85 Heavy Oblique'), url('assets/fonts/AvenirLTStd-HeavyOblique.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 95 Black';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 95 Black'), url('assets/fonts/AvenirLTStd-Black.woff') format('woff');
  }
  @font-face {
    font-family: 'Avenir LT Std 95 Black Oblique';
    font-style: normal;
    font-weight: normal;
    src: local('Avenir LT Std 95 Black Oblique'), url('assets/fonts/AvenirLTStd-BlackOblique.woff') format('woff');
  }
</style>

