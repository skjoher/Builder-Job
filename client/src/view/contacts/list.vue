<template>
  <div>
    <Card>
      <p slot="title" style="margin: 4px 0;">
        <Icon type="logo-uro"></Icon>Contacts
      </p>
      <Button slot="extra" type="primary" @click="value3 = true"><Icon :size="25" type="md-person-add" /></Button>
        <Drawer
            title="Create"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="Name" label-position="top">
                            <Input v-model="formData.name" placeholder="please enter user name" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="B Name" label-position="top">
                            <Input v-model="formData.bname" placeholder="please enter user name" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="ctype" label-position="top">
                            <Select v-model="formData.ctype" placeholder="please select type">
                                <Option value="typ1">type1</Option>
                                <Option value="ty2">type2</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="DateTime" label-position="top">
                            <DatePicker v-model="formData.createTime" type="daterange" placeholder="please select the date" style="display: block" placement="bottom-end"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="Email" label-position="top">
                            <Input v-model="formData.email" placeholder=" email" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Mobile" label-position="top">
                            <Input v-model="formData.mobile" placeholder="Mobile number" />
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="Description" label-position="top">
                    <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
                </FormItem>
            </Form>
            <div class="drawer-footer">
                <Button style="margin-right: 8px" @click="cancelContacts">Cancel</Button>
                <Button type="primary" @click="addContacts">Submit</Button>
            </div>
        </Drawer> 

      <tables ref="tables" editable searchable search-place="top" v-model="formData" :columns="columns" @on-delete="handleDelete"/>
      
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getTableData } from "@/api/data";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import routers from "@/router";

export default {
  name: "tables_page",
  components: {
    Tables
  },
  data () {
    return {
		  contacts: [],
      value3: false,
      current: 0,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
        name: "",
        bname: "",
        ctype: "",
        mobile: "",
        createTime: "",
        email: "",
        desc: ""
      },
      columns: [
        { title: "Contact Name", key: "name", sortable: true },
        { title: "Business Name", key: "bname", sortable: true },
        { title: "Contact Type", key: "ctype",},
        { title: "Mobile", key: "mobile", editable: true },
        { title: "Email", key: "email", editable: true },
        { title: "Create-Time", key: "createTime" },
        {
          title: "Handle",
          key: "handle",
          options: ["delete"],
          button: [
            (h, params, vm) => {
              return h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "Are you sure you want to delete ?"
                  },
                  on: {
                    "on-ok": () => {
                      vm.$emit("on-delete", params);
                      vm.$emit(
                        "input",
                        params.tableData.filter(
                          (item, index) => index !== params.row.initRowIndex
                        )
                      );
                    }
                  }
                },
                [h("Button", "Custom delete")]
              );
            }
          ]
        }
      ],
      tableData: []
    }
  },
  components: {
    "vue-form-generator": VueFormGenerator.component
  },
  methods: {
    addContacts () {
      this.contacts.push( this.formData );
    },
		cancelContacts () {
			this.formData = ''
    },
    removeContacts (index) {
			this.contacts.splice(index, 1)
		},
		clearAll () {
			this.contacts = []
		},
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    },
    onComplete: function() {
      this.$swal("Done !!");
      this.instance();
    }
  },
  mounted() {
    getTableData().then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style>
.card-button {
  width: 100%;
  position: absolute;
  top: 90;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.rawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }

</style>

