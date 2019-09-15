<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-card>
                <v-card-title>Параметры приложения</v-card-title>
                <v-simple-table :dense="false">
                    <thead>
                    <tr>
                        <th class="text-left"></th>
                        <th class="text-left" style="white-space: nowrap; width: 1%">Название</th>
                        <th class="text-left" style="white-space: nowrap; width: 1%">Группа</th>
                        <th class="text-left" style="white-space: nowrap; width: 1%">Ключ</th>
                        <th class="text-left">Строковое значение</th>
                        <th class="text-left">Числовое значение</th>
                        <th class="text-left">Денежное значение</th>
                        <th class="text-left">Логическое значение</th>
                        <th class="text-left">Значение даты</th>
                        <th class="text-left"></th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in appParams" :key="item.id">
                        <td style="white-space: nowrap; width: 1%">
                            <v-btn class="mx-2" icon color="primary" @click.stop="deleteParam(item.id)">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </td>
                        <td>{{ item.name }}</td>
                        <td style="white-space: nowrap; width: 1%">{{ item.groupName }}</td>
                        <td style="white-space: nowrap; width: 1%">{{ item.keyName }}</td>
                        <td>{{ item.stringValue }}</td>
                        <td>{{ item.numberValue }}</td>
                        <td>{{ item.decimalValue | moneyFormat }}</td>
                        <td>
                            <v-switch
                                    v-model="item.booleanValue"
                                    label=""
                                    :disabled="true"
                            ></v-switch>
                        </td>
                        <td>{{ item.dateValue|dateFormatter}}</td>
                        <td style="white-space: nowrap; width: 1%">
                            <v-btn class="mx-2" icon color="primary" @click.stop="editParam(item.id)">
                                <v-icon>mdi-file-document-edit</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-col>
        <EditParamDialog :app-param-id="paramId"
                         :visible="showEditDialog"
                         @close="closeDialog()"/>
    </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import EditParamDialog from '@/components/params/EditParamDialog.vue';
import AppParamService from '@/services/AppParamService';

@Component({
    components: {EditParamDialog},
})
export default class AppParamsList extends Vue {

    get appParams() {
        return this.$store.state.appParams;
    }

    public paramId = '';
    public showEditDialog = false;

    public closeDialog() {
        this.showEditDialog = false;
        this.$store.dispatch('loadParams');
    }

    public deleteParam(id: string) {
        AppParamService.delete(id)
            .then((response) => {
                alert('Параметр успешно удален');
            });
        this.$store.dispatch('loadParams');
    }

    public editParam(id: string) {
        this.paramId = id;
        this.showEditDialog = true;
    }
}
</script>
