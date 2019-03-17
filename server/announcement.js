// Initialize using signing secret from environment variables
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/client');

const slackEvents = createEventAdapter(
  process.env.SLACK_SIGNING_SECRET
);
// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const { escapeForSlackWithMarkdown } = require('slack-hawk-down');

let messages= []
let channelId = process.env.CHANNEL_ID;

function formatMessage(message) {
    // remove @here and @channel
    let text = message.text.replace(/<!(.*?)>\s*/, '');
  
    // console.log(text);
    // console.log(escapeForSlackWithMarkdown(text));
  
    return {
      text: escapeForSlackWithMarkdown(text),
      time: parseInt(message.ts, 10)
    };
}

module.exports = {
    middleware() {
      return slackEvents.expressMiddleware();
    },
    listen() {
        // Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
        slackEvents.on('message', (event) => {
          console.log(event);
          console.log(
            `Received a message event: user ${event.user} in channel ${
              event.channel
            } says ${event.text}`
          );
          if(event.channel !== channelId){
            return;
          }

          if (event.subtype) {
            if (event.subtype === 'message_deleted' || event.subtype === 'message_changed') {
              module.exports.getAll();
            }
            return;
          }
          messages.unshift(formatMessage(event));
        });
    
        // Handle errors (see `errorCodes` export)
        slackEvents.on('error', console.error);
    },
    get(req, res) {
        res.json(messages);
    },
    async getAll() {
        const res = await web.conversations.history({
          channel: channelId,
          limit: 100
        });
    
        if (!res.ok) {
          // Maybe send a Slack message to organizers haha :)
          console.log(res);
          return;
        }
    
        messages = res.messages
          .filter((message) => {
            // Get only normal messages
            // If it has a subtype, not a normal message
            return !message.subtype;
          })
          .map(formatMessage);
      }

  };