<template>
            <v-card-text class="loader">
                <div class="text-xs-center">
                    <img src="../assets/images/mz-loader.gif" alt="Loader" />
                </div>
            </v-card-text>
</template>


<style lang="scss">
    .loader{
        background: rgba(255, 255, 255, 0.8);
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 9999;
        img{
            position: absolute;
            transform: translate(-50%,-50%);
            top: 50%;
            left: 50%;
        }
    }
</style>