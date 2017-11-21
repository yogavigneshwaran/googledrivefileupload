
const google = require('googleapis');
const fs = require('fs');
const key = require('./upload-ce6d3a3a0164.json');

const drive = google.drive('v3');
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/drive'],
  null
);

jwtClient.authorize((authErr) => {
  if (authErr) {
    console.log(authErr);
    return;
  }

  drive.files.list({ auth: jwtClient }, (listErr, resp) => {
    if (listErr) {
      console.log(listErr);
      return;
    }
    resp.files.forEach((file) => {
      console.log(`${file.name} (${file.mimeType})`);
    });
  });
});

const fileMetadata = {
    name: 'sampletextfileupload.txt',
    parents: ['1X-uO4DcfOuFm65zZl1l51fPK5fzFCCXK']
  };

  const media = {
    mimeType: 'text/plain',
    body: fs.createReadStream('./sampletextfileupload1.txt')
  };

  drive.files.create({
    auth: jwtClient,
    resource: fileMetadata,
    media,
    fields: 'id'
  }, (err, file) => {
    if (err) {
      console.log(err);
      return;
    }
    // Log the id of the new file on Drive
    console.log('Uploaded File Id: ', file.id);
  });
