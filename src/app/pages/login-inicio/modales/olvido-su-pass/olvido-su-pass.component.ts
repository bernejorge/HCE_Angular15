import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-olvido-su-pass',
  templateUrl: './olvido-su-pass.component.html',
  styleUrls: ['./olvido-su-pass.component.css']
})
export class OlvidoSuPassComponent implements OnInit {

  url = environment.URL_TO_PASS;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
