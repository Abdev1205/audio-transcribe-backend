const ffmpeg = require('fluent-ffmpeg');

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedDuration = `${hours} hrs ${minutes} mins ${secs} sec`;
  console.log("iam in format duration")
  return formattedDuration;
}

const audioDuration = (mp3Stream) => {
  return new Promise((resolve, reject) => {
    console.log("i am in audio duration ")
    const command = ffmpeg();
    command.input(mp3Stream)
      .noVideo() // If the stream contains video, ignore it
      .toFormat('null') // Specify the output format as null
      .on('end', function () {
        const duration = this._ffprobeData.format.duration;
        const formattedDuration = formatDuration(Math.round(duration));
        resolve(formattedDuration);
      })
      .on('error', function (err) {
        reject(err);
      });
    command.run();
  });
};

module.exports = { audioDuration };
