import { NativeModules, NativeEventEmitter } from 'react-native';
import { bitcoin } from '../../App';

export default class ChatService {
  constructor() {
    if (ChatService.instance) {
      return ChatService.instance;
    }

    this.service = NativeModules.ChatService;
    this.event = new NativeEventEmitter(this.service);
    this.onNewMessage();
    this.onNewListenAddr();

    ChatService.instance = this;
    return this;
  }

  stop = () => {
    this.service.stop();
  }

  dial = (multiaddr) => {
    this.service.dial(multiaddr);
  }

  send = (message) => {
    this.service.sendMessage(message);
  }

  onNewMessage = () => {
    this.event.addListener('newMessage', ((message) => {
      console.log(message);
    }));
  }

  onNewListenAddr = () => {
    this.event.addListener('newListenAddr', ((multiaddr) => {
      console.log(multiaddr);
    }));
  }

  startService = async () => {
    const xpriv = await bitcoin.getPrivKey();
    const shaXprv = await bitcoin.sha256(xpriv);
    const PeerID = await this.service.start(shaXprv);
    // this.service.dial('/ip4/192.168.0.25/tcp/41381');

    return PeerID;
  }


  getPeerID = async () => this.service.getPeerID()
}
