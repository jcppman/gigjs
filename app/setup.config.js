import Audio from './components/AudioPlayback';
import Video from './components/VideoPlayback';
import SceneView from './components/SceneView';
import Resource from './components/Resource';

const audioClips = [
  new Resource('audio/Jove_1.wav'),
  new Resource('audio/Jove_2.wav'),
  new Resource('audio/Jove_3.wav'),
];
const videoClips = [
  new Resource('video/Empty Room.webm'),
  new Resource('video/Google.webm'),
  new Resource('video/Switch Channels.webm'),
];

const audio = new Audio();
const video = new Video();
const scenes = [
  {
    title: 'Scene 1',
    description: 'desc 1',
    onStart: [
      video.loop(videoClips[0]),
    ],
  },
  {
    title: 'Scene 2',
    description: 'desc 2',
    onStart: [
      video.play(videoClips[1]),
      audio.play(audioClips[0]),
    ],
    onComplete: [
      audio.play(audioClips[1]),
    ],
    goNext: true,
  },
  {
    title: 'Scene 3',
    description: 'desc 3',
    onStart: [
      video.play(videoClips[2]),
      audio.play(audioClips[2]),
    ],
  },
  {
    title: 'Scene 1',
    description: 'desc 1',
    onStart: [
      video.loop(videoClips[0]),
    ],
  },
  {
    title: 'Scene 2',
    description: 'desc 2',
    onStart: [
      video.play(videoClips[1]),
      audio.play(audioClips[0]),
    ],
    onComplete: [
      audio.play(audioClips[1]),
    ],
    goNext: true,
  },
  {
    title: 'Scene 3',
    description: 'desc 3',
    onStart: [
      video.play(videoClips[2]),
      audio.play(audioClips[2]),
    ],
  },
];

const interfaces = {
  screen: {
    layout: [
      video,
    ],
    background: [
      audio,
    ],
  },
  control: {
    layout: [
      video,
      SceneView,
    ],
    background: [],
  },
};

export default { interfaces, scenes };
