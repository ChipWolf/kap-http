'use strict';
const fs = require('fs');
const request = require('request');

const contentTypes = new Map([
  ['.gif', 'image/gif'],
  ['.mp4', 'video/mp4'],
  ['.webm', 'video/webm'],
  ['.apng', 'image/apng']
]);

const action = async context => {
  const filePath = await context.filePath();

  context.setProgress('Uploading…');

  const formData = {
    image: fs.createReadStream(filePath)
  };

//  const options = {
//    hostname: context.config.get('host'),
//    port: context.config.get('port'),
//    path: context.config.get('path'),
//    method: context.config.get('method')
//  }

  var upload = request.post({url:'https://i.cwlf.uk', formData: formData}, function(error, response, data) {
    let uploadURL = data;
    context.copyToClipboard(uploadURL);
    context.notify('URL copied to the clipboard');
  })
};

const http = {
  title: 'Send HTTP(S) request',
  formats: ['gif', 'mp4', 'webm', 'apng'],
  action,
  config: {
//    host: {
//      title: 'Hostname',
//      type: 'string',
//      default: 'i.cwlf.uk',
//      required: true
//    },
//    port: {
//      title: 'Port',
//      type: 'string',
//      default: '443',
//      required: false
//    },
//    path: {
//      title: 'Path',
//      type: 'string',
//      default: '/',
//      required: false
//    },
//    method: {
//      title: 'HTTP Method',
//      type: 'string',
//      default: 'POST',
//      required: false
//    }
  }
};

exports.shareServices = [http];
