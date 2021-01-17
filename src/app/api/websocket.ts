import {apiChats} from './index'
import {appStore} from '../store/appStore'

declare type IndexedWebSocket = {
    [key in string]: WebSocket
}


export class WS {
    private static __instance: WS
    private sockets:IndexedWebSocket = {}

    constructor() {
      if (WS.__instance) {
        return WS.__instance
      }
      this.websockets()
      WS.__instance = this
    }

    getSockets() {
      return this.sockets
    }

    run() {
      this.websockets()
    }

    add(id: string) {
      return apiChats.token({id})
          .then(token => {
            const socket = socketEvents({
              chat: id,
              user: (appStore.getState('profile') as Indexed).id,
              token
            })
            this.sockets[id as string] = socket
            return socket
          })
    }

    private websockets() {
      const chats = appStore.getState('chats') as Indexed[]
      chats.forEach(chat => {
        const idChat = (chat as Indexed).id
        apiChats.token({id: idChat})
            .then(token => {
              const name = `${idChat}`
              this.sockets[name] = socketEvents({
                user: (appStore.getState('profile') as Indexed).id,
                chat: idChat,
                token
              })
            })
      })
    }
}


function socketEvents(props: Indexed):WebSocket {
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${props.user}/${props.chat}/${props.token}`)

  socket.addEventListener('open', () => {
    console.log('Соединение установлено')
    setInterval(()=>{
      socket.send(JSON.stringify({}))
    }, 5000)
  })

  socket.addEventListener('close', event => {
    if (event.wasClean) {
      console.log('Connect closed')
    } else {
      console.log(`Lost connection`, event)
    }
  })

  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data) as Indexed
    if (message.type !=='error') {
      if (Array.isArray(message)) {
        message.sort(sortDate).map(formatProps)
        appStore.dispatch('setMessagesChat', message)
      } else if (message.type !== 'user connected') {
        const messages = appStore.getState('messages') as Indexed[]
        messages.push(message)
        messages.sort(sortDate).map(formatProps)
        appStore.dispatch('setMessagesChat', messages)
      }
    }
  })

  socket.addEventListener('error', event => {
    console.log('Error', (event as any).message)
  })
  return socket
}

function sortDate(propsA:Indexed, propsB:Indexed) {
  const timeA = Date.parse(propsA.time as string)
  const timeB = Date.parse(propsB.time as string)
  return timeA-timeB
}

function formatProps(props:Indexed) {
  const userList = appStore.getState('userList') as Indexed[]
  if (props.user_id) {
    props['user'] = userList.find(item => item.id===props.user_id)
  } else {
    props['user'] = userList.find(item => item.id===props.userId)
  }
  return props
}


