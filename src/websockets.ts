require('dotenv').config();

import * as jwt from 'jsonwebtoken';
import WebSocket from "ws";

export default async (expressServer: any, array_path: string[]) => {

  let websocketServer = [] as WebSocket.Server[];

  for (const path of array_path) {
    websocketServer.push(
      new WebSocket.Server({
        noServer: true,
        path: path,
      })
    );
  }

  let clients = [] as any[];
  clients = array_path.map(() => []);

  expressServer.on("upgrade", (request: any, socket: any, head: any) => {
    for (let i = 0; i < array_path.length; i++) {
      if (request.url.startsWith(array_path[i])) {
        websocketServer[i].handleUpgrade(request, socket, head, (websocket) => {
          websocketServer[i].emit("connection", websocket, request);
        });
      } else {
        socket.destroy();
      }
    }
  });

  
  for (let i = 0; i < array_path.length; i++) {
    websocketServer[i].on('open', function open() {
      console.log('connected');
    })
  }

  for (let i = 0; i < array_path.length; i++) {
    websocketServer[i].on('connection', async function connection(websocketConnection, connectionRequest) {
      // get params from url
      const [_path, params] = connectionRequest?.url?.split("?") || ["", ""];
      const parsedParams = new URLSearchParams(params);
      // convert params to object
      const paramsObject: { [key: string]: any } = {};
      for (const [key, value] of parsedParams.entries()) {
        paramsObject[key] = value;
      }

      // check token is exist
      if (!paramsObject["token"]) {
        websocketConnection.close();
        return;
      }
      // check token is valid
      const auth_data = await checkToken(paramsObject["token"]);
      if (!auth_data) {
        websocketConnection.close();
        return;
      }
      // delete token from params
      delete paramsObject["token"];
      // add client to clients
      clients[i].push({
        client: websocketConnection as any,
        data: paramsObject as any,
      });

      websocketConnection.on("message", (message: string | Buffer) => {
        // has falue sendt_to & data
        const parsedMessage = JSON.parse(message.toString());
        // websocketConnection.send(JSON.stringify({ message: 'There be gold in them thar hills.' }));
        // this the better performance
        // for (const item of clients) {
        //   if (item.client !== websocketConnection) {
        //     // check if the message is for the client
        //     let isSame = true;
        //     for (const key in paramsObject) {
        //       if (paramsObject[key] !== item.data[key]) {
        //         isSame = false;
        //         break;
        //       }
        //     }
        //     // the message is sent to all clients except the sender
        //     if (item.client && isSame) {
        //       (item.client as WebSocket).send(JSON.stringify(
        //         {
        //           status: {
        //             code: 200,
        //             message: "Success",
        //           },
        //           data: parsedMessage
        //         }
        //       ));
        //     }
        //   }
        // }

        // this not necessary better performance but we want client count
        const filteredClients = clients[i].filter((item: any) => {
          var check_client_not_it_self_and_not_null = item.client !== websocketConnection && item.client !== null;
          let isSame = true;
          for (const key in parsedMessage.send_to) {
            if (parsedMessage.send_to[key] !== item.data[key]) {
              isSame = false;
              break;
            }
          }
          return check_client_not_it_self_and_not_null && isSame;
        });
        filteredClients.forEach((item: any) => {
          (item.client as WebSocket).send(JSON.stringify(
            {
              status: {
                code: 200,
                message: "Success",
                clients_count: filteredClients.length,
              },
              data: parsedMessage.data
            }
          ));
        });
      });
      websocketConnection.on('error', console.error);
      websocketConnection.on('close', function close() {
        console.log('disconnected');
        clients[i] = clients[i].filter((item: any) => item.client !== websocketConnection);
      });
    });
  }

  const checkToken = async (token: string) => {
    const secret_key = process.env.SCREET_KEY || 'secret';
    return new Promise<string | null>((resolve, reject) => {
      jwt.verify(token, secret_key, (err, auth_data) => {
        if (err) {
          resolve(null);
        } else {
          resolve(auth_data as any);
        }
      });
    });
  }

  return websocketServer;
};