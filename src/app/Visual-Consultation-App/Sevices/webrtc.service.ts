// import { Injectable } from '@angular/core';
// import { io } from 'socket.io-client';

// @Injectable({
//   providedIn: 'root',
// })
// export class WebrtcService {
//   private peerConnection: RTCPeerConnection;
//   private socket = io('http://localhost:9090');
//   private localStream: MediaStream;

//   constructor() {
//     this.peerConnection = new RTCPeerConnection();
//     this.setupSocketListeners();
//     this.setupPeerConnectionListeners();
//   }

//   private setupSocketListeners() {
//     this.socket.on('offer', async (offer) => {
//       await this.peerConnection.setRemoteDescription(
//         new RTCSessionDescription(offer)
//       );
//       const answer = await this.peerConnection.createAnswer();
//       await this.peerConnection.setLocalDescription(answer);
//       this.socket.emit('answer', { answer, room: offer.room });
//     });

//     this.socket.on('answer', async (answer) => {
//       await this.peerConnection.setRemoteDescription(
//         new RTCSessionDescription(answer)
//       );
//     });

//     this.socket.on('candidate', async (candidate) => {
//       await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     this.socket.on('user-joined', (data) => {
//       console.log('User joined:', data);
//       alert(`User ${data.id} joined room ${data.room}`);
//     });
//   }

//   private setupPeerConnectionListeners() {
//     this.peerConnection.onicecandidate = ({ candidate }) => {
//       if (candidate) {
//         this.socket.emit('candidate', { candidate, room: this.room });
//       }
//     };

//     this.peerConnection.ontrack = (event) => {
//       const remoteVideo = document.getElementById(
//         'remoteVideo'
//       ) as HTMLVideoElement;
//       remoteVideo.srcObject = event.streams[0];
//     };
//   }

//   private room: string;

//   public async startCall(room: string) {
//     this.room = room;
//     this.socket.emit('join', room);
//     this.localStream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     const localVideo = document.getElementById(
//       'localVideo'
//     ) as HTMLVideoElement;
//     localVideo.srcObject = this.localStream;
//     this.localStream
//       .getTracks()
//       .forEach((track) =>
//         this.peerConnection.addTrack(track, this.localStream)
//       );

//     const offer = await this.peerConnection.createOffer();
//     await this.peerConnection.setLocalDescription(offer);
//     this.socket.emit('offer', { offer, room });
//   }

//   public toggleVideo() {
//     this.localStream
//       .getVideoTracks()
//       .forEach((track) => (track.enabled = !track.enabled));
//   }

//   public toggleAudio() {
//     this.localStream
//       .getAudioTracks()
//       .forEach((track) => (track.enabled = !track.enabled));
//   }

//   public endCall() {
//     this.peerConnection.close();
//     this.socket.disconnect();
//   }
// }

import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebrtcService {
  private peerConnection: RTCPeerConnection;
  private socket = io('http://localhost:3000');
  private localStream: MediaStream | null = null;
  private room: string = '';

  constructor() {
    this.peerConnection = new RTCPeerConnection();
    this.setupSocketListeners();
    this.setupPeerConnectionListeners();
  }

  private setupSocketListeners() {
    this.socket.on('offer', async (offer) => {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.socket.emit('answer', { answer, room: this.room });
    });

    this.socket.on('answer', async (answer) => {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    this.socket.on('candidate', async (candidate) => {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    this.socket.on('user-joined', (data) => {
      console.log('User joined:', data);
      alert(`User ${data.id} joined room ${data.room}`);
    });
  }

  private setupPeerConnectionListeners() {
    this.peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.socket.emit('candidate', { candidate, room: this.room });
      }
    };

    this.peerConnection.ontrack = (event) => {
      const remoteVideo = document.getElementById(
        'remoteVideo'
      ) as HTMLVideoElement;
      remoteVideo.srcObject = event.streams[0];
    };
  }

  public async startCall(room: string) {
    this.room = room;
    this.socket.emit('join', room);
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const localVideo = document.getElementById(
      'localVideo'
    ) as HTMLVideoElement;
    localVideo.srcObject = this.localStream;
    this.localStream
      .getTracks()
      .forEach((track) =>
        this.peerConnection.addTrack(track, this.localStream)
      );

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.socket.emit('offer', { offer, room });
  }

  public toggleVideo() {
    if (this.localStream) {
      this.localStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
  }

  public toggleAudio() {
    if (this.localStream) {
      this.localStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
  }

  public endCall() {
    this.peerConnection.close();
    this.socket.disconnect();
  }
}
