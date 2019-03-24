<template>
  <div>
    <Row :gutter="32">
      <Col span="8">
        <Card style="width:350px">
          <div style="text-align:center">
            <img height="200" width="200" src="@/assets/images/logo.jpg">
          </div>
        </Card>
      </Col>
      <Col span="8">
        <Card style="width:350px">
          <div>
              <h3>Profile</h3>
               <Divider />
            <Row>
              <Col span="12">Full Name: A User</Col>
              <Col span="12">Account: user@prpl.one</Col>
            </Row>
            <Row>
              <Col span="12">City: Kolkata</Col>
              <Col span="12">Country: India</Col>
            </Row>
            <Row>
              <Col span="12">Birthday: Jan 26, 1945</Col>
              <Col span="12">
                Website:
                <a href="https://user.example.com" target="_blank">https://user.example.com</a>
              </Col>
            </Row>Message: Hello, Developer
          </div>
        </Card>
      </Col>
      <Col span="5">
        <Row>
          <Col span="5">
            <div>
              <Button slot="extra" @click="value4 = true" type="primary">View Profile</Button>
              <Drawer :closable="false" width="640" v-model="value4">
                <p :style="pStyle">User Profile</p>
                <p :style="pStyle">Personal</p>
                <div class="drawer-profile">
                  <Row>
                    <Col span="12">Full Name: A User</Col>
                    <Col span="12">Account: user@prpl.one</Col>
                  </Row>
                  <Row>
                    <Col span="12">City: Kolkata</Col>
                    <Col span="12">Country: India</Col>
                  </Row>
                  <Row>
                    <Col span="12">Birthday: Jan 26, 1945</Col>
                    <Col span="12">
                      Website:
                      <a
                        href="https://user.example.com"
                        target="_blank"
                      >https://user.example.com</a>
                    </Col>
                  </Row>Message: Hello, Developer
                </div>
                <Divider/>
                <Space/>
                <p :style="pStyle">Company</p>
                <div class="drawer-profile">
                  <Row>
                    <Col span="12">Position: Programmer</Col>
                    <Col span="12">Responsibilities:Coding</Col>
                  </Row>
                  <Row>
                    <Col span="12">Department: R and D</Col>
                  </Row>Skills:C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer, etc.
                </div>
                <Divider/>
                <p :style="pStyle">Contacts</p>
                <div class="drawer-profile">
                  <Row>
                    <Col span="12">Email: user@prpl.one</Col>
                    <Col span="12">Phone Number: +91 180000000000</Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      GitHub:
                      <a
                        href="https://github.com/user/user"
                        target="_blank"
                      >https://github.com/user/user</a>
                    </Col>
                  </Row>
                </div>
              </Drawer>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      value4: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      }
    };
  }
};
</script>
<style>
.drawer-profile {
  font-size: 14px;
}
.drawer-profile .ivu-col {
  margin-bottom: 12px;
}
</style>


