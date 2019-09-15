<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Дата создания</th>
                    <th class="text-left">Название</th>
                    <th class="text-left">Описание</th>
                    <th class="text-left">Тип</th>
                    <th class="text-left">Цель счета</th>
                    <th class="text-left">Округлять?</th>
                    <th class="text-left">Статус</th>
                    <th class="text-left">Валюта</th>
                    <th class="text-left">Учитывать в балансе?</th>
                    <th class="text-left">
                        <v-btn class="mx-2" fab dark small color="primary" @click="addAccount">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in accounts" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.insTime | dateFormatter}}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.accountType }}</td>
                    <td>{{ item.targetCost | moneyFormat }}</td>
                    <td>
                        <v-switch
                                v-model="item.round"
                                label=""
                                :disabled="true"
                        ></v-switch>
                    </td>
                    <td>{{ item.status }}</td>
                    <td>{{ item.currency }}</td>
                    <td>
                        <v-switch
                                v-model="item.balance"
                                label=""
                                :disabled="true"
                        ></v-switch>
                    </td>
                    <td style="white-space: nowrap; width: 1%">
                        <v-btn class="mx-2" fab dark small color="primary" @click.stop="editAccount(item.id)">
                            <v-icon>mdi-file-document-edit</v-icon>
                        </v-btn>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-col>
        <EditAccountDialog :accountId="accountId" :visible="showEditDialog" @close="showEditDialog=false"/>
        <CreateAccountDialog :visible="showCreateDialog" @close="showCreateDialog=false"/>
    </v-row>
</template>

<script lang="ts">
import EditAccountDialog from '@/components/account/EditAccountDialog.vue';
import CreateAccountDialog from '@/components/account/CreateAccountDialog.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {EditAccountDialog, CreateAccountDialog},
})
export default class AccountList extends Vue {
    get accounts() {
        return this.$store.state.accounts;
    }

    public showEditDialog = false;
    public showCreateDialog = false;
    public accountId = null;

    public addAccount() {
        this.showCreateDialog = true;
    }

    public editAccount(accountID: any) {
        this.accountId = accountID;
        this.showEditDialog = true;
    }
}
</script>
