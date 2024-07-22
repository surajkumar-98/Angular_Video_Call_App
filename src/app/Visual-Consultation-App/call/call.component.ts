// import { Component, OnInit } from '@angular/core';
// import { WebrtcService } from '../../Visual-Consultation-App/Sevices/webrtc.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-call',
//   templateUrl: './call.component.html',
//   styleUrls: ['./call.component.css'],
// })
// export class CallComponent implements OnInit {
//   room: string;

//   constructor(
//     private webrtcService: WebrtcService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params) => {
//       this.room = params['room'];
//       if (this.room) {
//         this.startCall(this.room);
//       }
//     });
//   }

//   startCall(room: string) {
//     this.webrtcService.startCall(room);
//   }

//   toggleVideo() {
//     this.webrtcService.toggleVideo();
//   }

//   toggleAudio() {
//     this.webrtcService.toggleAudio();
//   }

//   endCall() {
//     this.webrtcService.endCall();
//   }

//   generateLink() {
//     return `${window.location.origin}/call?room=${this.room}`;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebrtcService } from '../../Visual-Consultation-App/Sevices/webrtc.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit {
  room: string;

  constructor(
    private route: ActivatedRoute,
    private webrtcService: WebrtcService
  ) {
    this.room = '';
  }

  ngOnInit(): void {
    this.room = this.route.snapshot.paramMap.get('room')!;
    this.webrtcService.startCall(this.room);
  }

  toggleVideo() {
    this.webrtcService.toggleVideo();
  }

  toggleAudio() {
    this.webrtcService.toggleAudio();
  }

  takeScreenshot() {
    // Implement screenshot functionality here
  }

  endCall() {
    this.webrtcService.endCall();
  }

  getCallLink() {
    return `${window.location.origin}/call/${this.room}`;
  }
}
