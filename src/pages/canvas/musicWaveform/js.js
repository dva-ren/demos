const Visualizer = function(config) {
  this.audioContext = null
  this.analyser = null
  this.source = null // the audio source
  this.config = config
  this.frequency = []
  this.playing = false
  this.ready = false
  this.loadFailed = false
}
Visualizer.prototype = {
  init() {
    this._prepare()
    this.getData()
    this._analyser()
  },
  _prepare() {
    // 实例化一个音频上下文类型window.AudioContext。目前Chrome和Firefox对其提供了支持，但需要相应前缀，Chrome中为window.webkitAudioContext，Firefox中为mozAudioContext。
    // 所以为了让代码更通用，能够同时工作在两种浏览器中，只需要一句代码将前缀进行统一即可。
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
    try {
      this.audioContext = new AudioContext()
    }
    catch (e) {
      console.log(e)
    }
  },
  _analyser() {
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.smoothingTimeConstant = 0.85
    this.analyser.fftSize = 32// 傅里叶变换参数 简化成16个元素数组
    // 将source与分析器连接
    this.source.connect(this.analyser)
    // 将分析器与destination连接，这样才能形成到达扬声器的通路
    this.analyser.connect(this.audioContext.destination)
    this.frequency = new Uint8Array(this.analyser.frequencyBinCount)
  },
  getData() {
    // 建立缓存源
    this.source = this.audioContext.createBufferSource()
    const request = new XMLHttpRequest()
    // 请求资源
    request.open('GET', this.config.url, true)
    request.responseType = 'arraybuffer'
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200)
          this.ready = true
        else
          this.loadFailed = true
      }
    }
    request.onload = function() {
      const audioData = request.response
      // 解码
      this.audioContext.decodeAudioData(audioData, (buffer) => {
        this.source.buffer = buffer
        //                        console.log(buffer.duration);//资源长度
        //                        this.source.connect(this.audioContext.destination);
        // 将audioBufferSouceNode连接到audioContext.destination，
        // 这个AudioContext的destination也就相关于speaker（扬声器）。
        this.source.loop = this.config.loop || false
      },
      // eslint-disable-next-line no-unused-expressions
      (e) => { `Error with decoding audio data${e.err}` })
    }
    request.send()
  },
  play() {
    this.source.start(0)
    this.playing = true
    const timer = setInterval(() => {
      this.analyser.getByteFrequencyData(this.frequency)
      if (this.source.buffer) {
        if (this.audioContext.currentTime > this.source.buffer.duration) {
          this.source.stop(0)
          this.playing = false
          clearInterval(timer)
        }
      }
    }, 100)
  },
  stop() {
    this.source.stop(0)
    this.playing = false
  },
}
