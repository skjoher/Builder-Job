import { Modal } from 'iview'

const beforeClose = {
  before_close_normal: (resolve) => {
    Modal.confirm({
      title: 'you want to close this page !',
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      }
    })
  }
}

export default beforeClose
