import {apiAuth, apiChats} from './index'
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

    private websockets() {
      const id:Indexed = {}
      apiAuth.user()
          .then(data=>{
            id.user = data.id
            return apiChats.chats()
          })
          .then(data=>{
            const chats = data as []
            chats.forEach(chat => {
              const idChat = (chat as Indexed).id
              id.chat = idChat
              apiChats.token({id: idChat})
                  .then(token => {
                    const name = `${idChat}`
                    this.sockets[name] = socketEvents({
                      user: id.user,
                      chat: idChat,
                      token
                    })
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
      console.log('Соединение закрыто чисто')
    } else {
      console.log(`Lost connection`, event)
    }
  })

  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data) as Indexed
    if (message.type !=='error') {
      console.log('Получены данные', message)
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
    console.log('Ошибка', (event as any).message)
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


// Получены данные
// {content: "Something's wrong. Try again", type: "error"}
// content: "Something's wrong. Try again"
// type: "error"
// __proto__: Object


