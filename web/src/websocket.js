class Network {
    constructor(address = "") {
        if (!!Network.instance) {
            return Network.instance;
        }

        Network.instance = this;

        this.address = address;
        this.socket = new WebSocket(this.address);

        return this;
    }

    broadcast(data) {
        this.socket.send(JSON.stringify({type: 'broadcast', message: data}));
    }

    login(user) {
        this.socket.send(JSON.stringify({
            type: 'login', data: {...user}
        }));
    }

    updateUser(user) {
        this.socket.send(JSON.stringify({
            type: 'userUpdate', data: {...user}
        }));
    }

    subscribe(type, callback) {
        return this.socket.addEventListener('message', e => {
            try {
                const data = JSON.parse(e.data);
                if (data.type === type) {
                    callback(data);
                }
            } catch {
                console.log('JSON failed on new message');
            }

        })
    }

    unsubscribe(listener) {
        this.socket.removeEventListener('message', listener);
    }

}

export default Network;