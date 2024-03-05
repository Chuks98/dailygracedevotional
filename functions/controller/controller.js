const { devotionAudio, devotionThumbnail } = require('../config/multer_config');

const sendAudio = (req, res) => {
  // Assuming you have a field named 'audio' in your form
  devotionAudio.single('audio')(req, res, (err) => {
    if (err) {
      // Handle Multer error (e.g., file type not allowed)
      console.error('Error uploading audio:', err);
      return res.status(400).send('Error uploading audio');
    }

    // The file has been uploaded successfully
    console.log('Audio uploaded successfully:', req.file);

    // Now, you can continue with other logic or send a response
    res.status(200).send('Audio uploaded successfully');
  });
};

const sendThumbnail = (req, res) => {
    // Assuming you have a field named 'audio' in your form
    devotionThumbnail.single('thumbnail')(req, res, (err) => {
      if (err) {
        // Handle Multer error (e.g., file type not allowed)
        console.error('Error uploading thumbnail:', err);
        return res.status(400).send('Error uploading thumbnail');
      }
  
      // The file has been uploaded successfully
      console.log('Thumbnail uploaded successfully:', req.file);
  
      // Now, you can continue with other logic or send a response
      res.status(200).send('Thumbnail uploaded successfully');
    });
  };

module.exports = { sendAudio, sendThumbnail };
