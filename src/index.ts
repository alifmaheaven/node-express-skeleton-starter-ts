import app from './app';
import websockets from './websockets';

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});


// this how to consume websockets
// ws://localhost:5000/websockets
// {
//   "send_to": {
//    "rooms": "5050",
//   },
//   "data": {
//    "message": "test"
//   }
// }

websockets(server, ['/websockets']);




