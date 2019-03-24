<template>
  <div class="container">
    <form-wizard @on-complete="onComplete" color="#e67e22" error-color="#a94442">
      <h2 slot="title">This will replace the whole title</h2>
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
      <tab-content title="Additional Info" icon="ti-settings" :before-change="validateSecondTab">
        <vue-form-generator
          :model="model"
          :schema="secondTabSchema"
          :options="formOptions"
          ref="secondTabForm"
        ></vue-form-generator>
      </tab-content>

      <tab-content title="Last step" icon="ti-check">
        <h4>json data is ready!</h4>
        <div class="panel-body">
          <pre v-if="model" v-html="prettyJSON(model)"></pre>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";

// var VueFormGenerator = window.VueFormGenerator;
// import { validators, component as VueFormGenerator} from 'vue-form-generator'
export default {
  data() {
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
      }
    };
  },
  components: {
    "vue-form-generator": VueFormGenerator.component
  },
  methods: {
    onComplete: function() {
      this.$swal('Done !!');
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
    instance: function(info) {
      const title = "Title";
      const content = "<p>Content of dialog</p><p>Content of dialog</p>";
      this.$Modal.info({
        title: title,
        content: this.prettyJSON(this.model)
      });
    }
  }
};
</script>


<style>
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
