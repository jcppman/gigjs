import Audio from './components/AudioPlayback';
import Video from './components/VideoPlayback';
import SceneView from './components/SceneView';
import Resource from './components/Resource';

const audioClips = [
  new Resource('audio/Jove_1.wav'),

  new Resource('audio/Mark_1.wav'),
  new Resource('audio/Mark_2.wav'),
  new Resource('audio/Mark_3.wav'),
  new Resource('audio/Mark_4.wav'),
  new Resource('audio/Mark_5.wav'),

  new Resource('audio/Mark_6.wav'),


  new Resource('audio/Mark_7.wav'),
  new Resource('audio/Jove_2.wav'),

  new Resource('audio/Jove_3.wav'),
];

const ringtone = new Resource('audio/Shuke.wav');

const videoClips = [
  new Resource('video/Meeting.webm'),

  new Resource('video/Meeting_ended.webm'),
  new Resource('video/Empty.webm'),

  new Resource('video/Appear.webm'),

  new Resource('video/Phone_first.webm'),

  new Resource('video/Google.webm'),

  new Resource('video/Basketball.webm'),

  new Resource('video/Channels.webm'),

  new Resource('video/Phone_second.webm'),

  new Resource('video/Pushup-1.webm'),
  new Resource('video/Pushup-2.webm'),
  new Resource('video/Pushup-3.webm'),
];

const audio = new Audio();
const video = new Video();
const scenes = [
  {
    title: '开会中',
    description: '开会中',
    actions: [
      video.loop(videoClips[0]),
      audio.play(audioClips[0]),
    ],
  },
  {
    title: '结束',
    description: '等起身',
    actions: [
      video.play(videoClips[1]),
    ],
    goNextWhenFinish: video,
  },
  {
    title: '空房间',
    description: '',
    actions: [
      video.loop(videoClips[2]),
    ],
  },
  {
    title: '成功',
    description: '等马克',
    actions: [
      video.play(videoClips[3]),
    ],
    goNextWhenFinish: video,
  },
  {
    title: '电话响',
    description: '',
    actions: [
      video.loop(videoClips[4]),
      audio.loop(ringtone),
    ],
  },
  {
    title: '接起电话',
    description: '等Lingda',
    actions: [
      audio.pause(),
    ],
  },
  {
    title: '马克电话1',
    description: '怎么回事',
    actions: [
      audio.play(audioClips[1]),
    ],
  },
  {
    title: '马克电话2',
    description: '打不开门',
    actions: [
      audio.play(audioClips[2]),
    ],
  },
  {
    title: '马克电话3',
    description: '好多次了',
    actions: [
      audio.play(audioClips[3]),
    ],
  },
  {
    title: '马克电话4',
    description: '赶紧赶紧',
    actions: [
      audio.play(audioClips[4]),
    ],
  },
  {
    title: '马克电话5',
    description: '那怎么办',
    actions: [
      audio.play(audioClips[5]),
    ],
  },
  {
    title: 'Google',
    description: '',
    actions: [
      video.play(videoClips[5]),
    ],
  },
  {
    title: '马克电话6',
    description: '等Linda',
    actions: [
      audio.play(audioClips[6]),
    ],
  },
  {
    title: '球赛',
    description: '等Strong',
    actions: [
      video.loop(videoClips[6]),
    ],
  },
  {
    title: '转台',
    description: '等抢回来',
    actions: [
      video.play(videoClips[7]),
    ],
  },
  {
    title: '电话响',
    description: '',
    actions: [
      audio.loop(ringtone),
    ],
  },
  {
    title: '接起来',
    description: '等Lingda',
    actions: [
      audio.pause(),
      video.loop(videoClips[8]),
    ],
  },
  {
    title: '马克电话7',
    description: '搞不定',
    actions: [
      audio.play(audioClips[7]),
    ],
  },
  {
    title: 'Jove',
    description: '小龙虾',
    actions: [
      audio.play(audioClips[8]),
    ],
  },
  {
    title: '结局-1',
    description: '等Lingda',
    actions: [
      video.play(videoClips[9]),
      audio.play(audioClips[9]),
    ],
    goNextWhenFinish: video,
  },
  {
    title: '结局-2',
    description: '',
    actions: [
      video.play(videoClips[10]),
    ],
    goNextWhenFinish: video,
  },
  {
    title: 'Credit',
    description: '',
    actions: [
      video.play(videoClips[11]),
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
      [
        video.with({ muted: true }),
      ],
      SceneView,
    ],
    background: [],
  },
};

export default { interfaces, scenes };
