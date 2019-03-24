<template>
  <div>
    <Card>
      Iview - admin will automatically collected error in your program, you can to send error log to the back-end stores it.If you don't need this function, will '. / SRC/config/index. Js' plugin 'error - store attributes in the delete.
      In the development environment, the error in your program will be collected, it may go against your screen, you can be '. / SRC/config/index. Js' of 'error - store' 'developmentOff' is set to true.
      If you just want to collect the error log, don't want to see the error log the logged in user. You can view the log entry is not available, simply '. / SRC/config/index. Js' of 'error - store' 'showInHeader' set to false.
    </Card>
    <Card style="margin-top: 20px;">
      <Row>
        <i-col span="8">
          <Button @click="click" style="display: block">Click the test trigger program error</Button>
          <Button @click="ajaxClick" style="margin-top:10px;">Click on the test request error trigger ajax interface</Button>
        </i-col>
        <i-col span="16">
          Ajax interface request is easy to mock a nonexistent interface, so the server will be submitted to the 404 error, error collection mechanism will collect this error, when tests have certain network latency, so wait for a while after click on the button can collected by mistake.。
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { errorReq } from '@/api/data'
export default {
  name: 'error_store_page',
  methods: {
    click () {
      console.log(admin)
    },
    ajaxClick () {
      errorReq()
    }
  }
}
</script>

<style>

</style>
