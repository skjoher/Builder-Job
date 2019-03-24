<template>
  <div>
    <Card>
      <p slot="title" style="margin: 4px 0;">
        <Icon type="logo-uro"></Icon>Pricing
      </p>
      <Button slot="extra" type="primary" @click="value3 = true"><Icon :size="25" type="md-add" /></Button>
      <Drawer v-model="value3" width="720" :mask-closable="false" :styles="styles" placement="left">
        <div class="container">
          <form-wizard @on-complete="onComplete" color="#5cadff" error-color="#a94442">
            <h2 slot="title">This will replace the title</h2>
            <tab-content title="Personal details" icon="ti-user" :before-change="validateFirstTab">
              <div class="panel panel-default">
                <div class="panel-body">
                  <vue-form-generator
                    :model="model"
                    :schema="firstTabSchema"
                    :options="formOptions"
                    ref="firstTabForm"
                  ></vue-form-generator>
                </div>
              </div>
            </tab-content>
            <tab-content
              title="Additional Info"
              icon="ti-settings"
              :before-change="validateSecondTab"
            >
              <vue-form-generator
                :model="model"
                :schema="secondTabSchema"
                :options="formOptions"
                ref="secondTabForm"
              ></vue-form-generator>
            </tab-content>

            <tab-content title="Last step" icon="ti-check" >
              <h4>json data is ready!</h4>
              <div class="panel-body">
                <pre v-if="model" v-html="prettyJSON(model)"></pre>
              </div>
            </tab-content>
          </form-wizard>
        </div>
      </Drawer>

      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">Export to Csv file</Button>
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
      model: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        streetName: "",
        streetNumber: "",
        city: "",
        pincode: "",
        country: ""
      },
      formOptions: {
        validationErrorClass: "has-error",
        validationSuccessClass: "has-success",
        validateAfterChanged: true
      },
      firstTabSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "First name",
            model: "firstName",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-6"
          },
          {
            type: "input",
            inputType: "text",
            label: "Last name",
            model: "lastName",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-6"
          },
          {
            type: "input",
            inputType: "text",
            label: "Email",
            model: "email",
            required: true,
            validator: VueFormGenerator.validators.email,
            styleClasses: "col-md-4"
          },
          {
            type: "input",
            inputType: "number",
            label: "Mobile",
            model: "mobile",
            styleClasses: "col-xs-12"
          }
        ]
      },
      secondTabSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Street name",
            model: "streetName",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-9"
          },
          {
            type: "input",
            inputType: "text",
            label: "Street number",
            model: "streetNumber",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-3"
          },
          {
            type: "input",
            inputType: "text",
            label: "City",
            model: "city",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-6"
          },
          {
            type: "input",
            inputType: "number",
            label: "PinCode",
            model: "pincode",
            required: true,
            styleClasses: "col-xs-6"
          },
          {
            type: "select",
            label: "Country",
            model: "country",
            required: true,
            validator: VueFormGenerator.validators.string,
            values: ["India", "Romania", "Germany"],
            styleClasses: "col-xs-6"
          }
        ]
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      },
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
        url: "",
        owner: "",
        type: "",
        approver: "",
        date: "",
        desc: ""
      },
      columns: [
        { title: "Name", key: "name", sortable: true },
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
    },
    validateFirstTab: function() {
      return this.$refs.firstTabForm.validate();
    },
    validateSecondTab: function() {
      return this.$refs.secondTabForm.validate();
    },
    prettyJSON: function(json) {
      if (json) {
        json = JSON.stringify(json, undefined, 4);
        json = json
          .replace(/&/g, "&")
          .replace(/</g, "<")
          .replace(/>/g, ">");
        return json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          function(match) {
            var cls = "number";
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = "key";
              } else {
                cls = "string";
              }
            } else if (/true|false/.test(match)) {
              cls = "boolean";
            } else if (/null/.test(match)) {
              cls = "null";
            }
            return '<span class="' + cls + '">' + match + "</span>";
          }
        );
      }
    },
    instance: function() {
      routers.push({name: 'error_401'});
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
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

pre {
  overflow: auto;
}
pre .string {
  color: #885800;
}
pre .number {
  color: blue;
}
pre .boolean {
  color: magenta;
}
pre .null {
  color: red;
}
pre .key {
  color: green;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
}

fieldset {
  border: 0;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;

  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}

.field-checklist .wrapper {
  width: 100%;
}
.width-50 {
  width: 50% !important;
}
.width-50:first-child {
  padding: 0 10px 0 0;
}
.width-50:last-child {
  width: 50% !important;
  padding: 0 0 0 10px;
}
</style>
