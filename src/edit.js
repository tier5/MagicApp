{/* <template>
    <div id = "edit_mz_box_icon">
        <a href="" @click.prevent="editNode">
            <div class="fa fa-save" ></div>
        </a>
        <a href="" @click.prevent="deleteNode">
            <div class="fa fa-trash"></div>
        </a>
    </div>
</template>

<script>
export default {
    name : 'editBox',
    data: function(){
        return {

        }
    },
    computed: {

    },
    methods: {
        deleteNode(){
            let element = document.getElementById('edit_mz_box_icon');
            let parentElement= element.parentElement;
            let elementId = parentElement.getAttribute("data-mzs-id")
            console.log('id got deleted',elementId)
            parentElement.remove();
        },
        editNode(){
            let element = document.getElementById('edit_mz_box_icon');
            let parentElement= element.parentElement;
            let elementId = parentElement.getAttribute("data-mzs-id");
            let elementText = parentElement.textContent;
            // parentElement.contentEditable = false
            // document.getElementById('edit_mz_box_icon').remove()
            console.log(`the id ${elementId} text got changed to :: ${elementText}`);
        }
    },
}
</script>

<style>
    a {
        cursor: pointer;
    }
    .mz_edit_element{
        position: relative;
    }
    #edit_mz_box_icon{
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 10px;
    }
    #edit_mz_box_icon a{
        margin-right: 10px;
    }
</style>
 */}


 import Vue from 'vue';


 const Edit = Vue.component('edit-component',{

 })


 export { Edit as default}
