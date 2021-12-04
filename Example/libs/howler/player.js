var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;
};
Player.prototype = {

  stop: function() {
    // stop the current audio
    var self = this;
    var sound = self.playlist[self.index].howl;
    sound.pause();    
  },
  stopAll: function() {
    // stop all the audios
    var self = this;
    self.playlist.forEach(x => {
      var sound = x.howl;
      if (sound) {
        sound.stop();
      }
    });
  },
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.playlist[index];

    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: ['./' + data.file],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: function() {
          localStorage.setItem("currentAudioIndex", self.index);
          localStorage.setItem("currentAudioIndexName", self.playlist[self.index].name);
          localStorage.setItem("currentAudioStatus", "playing");
        },
        onload: function() {
          localStorage.setItem("currentAudioStatus", "loaded");
        },
        onend: function() {
          localStorage.setItem("currentAudioStatus", "end");

          var autoSkip = localStorage.getItem("audioSettings_autoSkip");
          if (autoSkip == "1") {
              self.skip('next');
          }
        },
        onpause: function() {
          localStorage.setItem("currentAudioStatus", "paused");
        },
        onstop: function() {
          localStorage.setItem("currentAudioStatus", "stopped");
          localStorage.setItem("currentAudioIndex", "");
          localStorage.setItem("currentAudioIndexName", "");
        },
        onseek: function() {
          // localStorage.setItem("currentAudioStatus", "seeking");
        }
      });
    }

    sound.play();
    self.index = index;
  },
  pause: function() {
    var self = this;
    var sound = self.playlist[self.index].howl;
    sound.pause();
  },
  skip: function(direction) {
    var self = this;
    var index = 0;
    if (direction === 'prev') {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }
    self.skipTo(index);
  },
  skipTo: function(index) {
    var self = this;
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }
    self.play(index);
  },
  volume: function(val) {
    var self = this;
    Howler.volume(val);

    var barPer = (val * 90) / 100;
    localStorage.setItem("currentAudioVolume", val);
    localStorage.setItem("currentAudioVolumePer", barPer);
  },
  seek: function(per) {
    var self = this;
    var sound = self.playlist[self.index].howl;
    if (sound.playing()) {
      sound.seek(sound.duration() * per);
    }
  },
  step: function() {
    var self = this;
    var sound = self.playlist[self.index].howl;
    if (sound.playing()) {
      // requestAnimationFrame(self.step.bind(self));
    }
  }
};

function playAudio(name, type = 'skipTo') {
  var idx = player.playlist.findIndex(x => x.name == name);
  if (idx>=0) {
    if (type == 'skipTo') {
      player.skipTo(idx);
    } else if (type == 'play') {
      player.play(idx);
    }
  }
}

function stopAudioAll() {
  if (player) {
    player.stopAll();
  }
}

function setAudioVolume(vol) {
  if (player) {
    player.volume(vol);
    $(".audioVolume").val(vol)
  }
}